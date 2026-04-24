import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ykehacyfucjbkxnsfcrc.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrZWhhY3lmdWNqYmt4bnNmY3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4NjM1ODAsImV4cCI6MjA5MjQzOTU4MH0.1XK-x3340IHudagHdjB-eLzcy6YLUGtXPpF7dafsYh0'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const AGENT_NAME = 'Aurora'
const AGENT_ROLE = 'Assistente Comercial'
const WELCOME_MSG = 'Oi! Sou a Aurora, da Global Label. Como posso te ajudar com seu rótulo ou etiqueta? 😊'

function generateId() {
  return 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}

function formatTime(dateStr) {
  return new Date(dateStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [conversationId, setConversationId] = useState(() => localStorage.getItem('gl_conv_id'))
  const [visitorId] = useState(() => {
    const stored = localStorage.getItem('gl_visitor_id')
    if (stored) return stored
    const id = generateId()
    localStorage.setItem('gl_visitor_id', id)
    return id
  })

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const channelRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [])

  // Subscribe to realtime messages
  const subscribeToMessages = useCallback((convId) => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
    }

    channelRef.current = supabase
      .channel('gl-widget-' + convId)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${convId}`
      }, (payload) => {
        const msg = payload.new
        if (msg.sender_type !== 'visitor') {
          setMessages(prev => [...prev, { content: msg.content, sender_type: msg.sender_type, created_at: msg.created_at }])
          setIsLoading(false)
          if (!isOpen) setShowBadge(true)
        }
      })
      .subscribe()
  }, [isOpen])

  // Init conversation
  const initConversation = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          visitor_id: visitorId,
          visitor_name: 'Visitante',
          source: 'widget',
          status: 'ai_mode',
          page_url: window.location.href
        })
        .select('id')
        .single()

      if (error) throw error

      const convId = data.id
      setConversationId(convId)
      localStorage.setItem('gl_conv_id', convId)

      setMessages([{ content: WELCOME_MSG, sender_type: 'ai', created_at: new Date().toISOString() }])
      subscribeToMessages(convId)
    } catch (err) {
      console.error('Erro ao iniciar conversa:', err)
    }
  }, [visitorId, subscribeToMessages])

  // Load existing messages
  useEffect(() => {
    if (!conversationId) return

    const loadMessages = async () => {
      try {
        const { data } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })

        if (data && data.length > 0) {
          setMessages(data.map(m => ({ content: m.content, sender_type: m.sender_type, created_at: m.created_at })))
        } else {
          setMessages([{ content: WELCOME_MSG, sender_type: 'ai', created_at: new Date().toISOString() }])
        }

        subscribeToMessages(conversationId)
      } catch (err) {
        console.error('Erro ao carregar mensagens:', err)
      }
    }

    loadMessages()

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
    }
  }, [conversationId, subscribeToMessages])

  // Scroll on new messages
  useEffect(() => { scrollToBottom() }, [messages, isLoading, scrollToBottom])

  // Focus input when opening
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(prev => !prev)
    setShowBadge(false)
    if (!isOpen && !conversationId) initConversation()
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    setInput('')
    setIsLoading(true)

    setMessages(prev => [...prev, { content: text, sender_type: 'visitor', created_at: new Date().toISOString() }])

    try {
      let convId = conversationId
      if (!convId) {
        const { data, error } = await supabase
          .from('chat_conversations')
          .insert({ visitor_id: visitorId, visitor_name: 'Visitante', source: 'widget', status: 'ai_mode', page_url: window.location.href })
          .select('id').single()
        if (error) throw error
        convId = data.id
        setConversationId(convId)
        localStorage.setItem('gl_conv_id', convId)
        subscribeToMessages(convId)
      }

      const { error } = await supabase
        .from('chat_messages')
        .insert({ conversation_id: convId, sender_type: 'visitor', sender_name: 'Visitante', content: text })

      if (error) throw error
    } catch (err) {
      console.error('Erro ao enviar:', err)
      setIsLoading(false)
      setMessages(prev => [...prev, { content: 'Desculpe, ocorreu um erro. Tente novamente.', sender_type: 'ai', created_at: new Date().toISOString() }])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <style>{`
        .caw-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: linear-gradient(135deg, #13AFF0, #F1702D);
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 24px rgba(19,175,240,0.35);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .caw-toggle:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(19,175,240,0.5); }
        .caw-toggle svg { width: 28px; height: 28px; fill: white; }

        .caw-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #F1702D;
          color: white;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Open Sans', sans-serif;
        }

        .caw-container {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 380px;
          height: 540px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0,0,0,0.3);
          z-index: 99998;
          display: flex;
          flex-direction: column;
          font-family: 'Open Sans', sans-serif;
          animation: caw-slideIn 0.3s ease;
          border: 1px solid rgba(19,175,240,0.15);
        }
        @keyframes caw-slideIn {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .caw-header {
          background: linear-gradient(135deg, var(--ink-0, #05070b) 0%, var(--ink-1, #0d1117) 100%);
          padding: 18px 20px;
          color: var(--fg, white);
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 2px solid #13AFF0;
        }
        .caw-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, #13AFF0, #F1702D);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 17px;
          font-family: 'Roboto', sans-serif;
          flex-shrink: 0;
          color: white;
        }
        .caw-header-info h3 {
          font-size: 15px;
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          margin: 0 0 2px;
          color: var(--fg, white);
        }
        .caw-header-info span {
          font-size: 12px;
          opacity: 0.8;
          font-weight: 400;
          color: var(--fg, white);
        }
        .caw-online {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          margin-right: 6px;
          animation: caw-pulse 2s infinite;
        }
        @keyframes caw-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .caw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          background: #f0f4f8;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .caw-messages::-webkit-scrollbar { width: 4px; }
        .caw-messages::-webkit-scrollbar-thumb { background: #b0bec5; border-radius: 4px; }

        .caw-msg {
          max-width: 82%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13.5px;
          line-height: 1.55;
          animation: caw-fadeIn 0.3s;
          word-wrap: break-word;
        }
        @keyframes caw-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .caw-msg.agent {
          background: white;
          color: #333333;
          align-self: flex-start;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .caw-msg.visitor {
          background: linear-gradient(135deg, #13AFF0, #0e8fc4);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
        }
        .caw-msg-name {
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 3px;
          color: #13AFF0;
        }
        .caw-msg-time {
          font-size: 10px;
          opacity: 0.5;
          margin-top: 4px;
          text-align: right;
        }

        .caw-typing {
          align-self: flex-start;
          padding: 10px 14px;
          background: white;
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .caw-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #69727D;
          animation: caw-bounce 1.4s infinite;
        }
        .caw-dot:nth-child(2) { animation-delay: 0.2s; }
        .caw-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes caw-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .caw-input-area {
          padding: 12px 16px;
          background: white;
          border-top: 1px solid #e2e8f0;
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .caw-input {
          flex: 1;
          border: 1.5px solid #e2e8f0;
          border-radius: 24px;
          padding: 10px 16px;
          font-size: 13.5px;
          outline: none;
          font-family: 'Open Sans', sans-serif;
          transition: border-color 0.2s;
          color: #333333;
        }
        .caw-input:focus { border-color: #13AFF0; }
        .caw-input::placeholder { color: #69727D; }
        .caw-send {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #13AFF0, #F1702D);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s;
          flex-shrink: 0;
        }
        .caw-send:hover { transform: scale(1.06); }
        .caw-send:active { transform: scale(0.92); }
        .caw-send svg { width: 18px; height: 18px; fill: white; }

        .caw-powered {
          text-align: center;
          padding: 6px;
          background: white;
          font-size: 10px;
          color: #69727D;
        }

        @media (max-width: 480px) {
          .caw-container {
            width: calc(100vw - 16px);
            height: calc(100vh - 100px);
            bottom: 80px;
            right: 8px;
            border-radius: 12px;
          }
        }
      `}</style>

      {/* Toggle Button */}
      <button className="caw-toggle" onClick={handleToggle}>
        {isOpen ? (
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        ) : (
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
        )}
        {showBadge && <span className="caw-badge">1</span>}
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="caw-container">
          <div className="caw-header">
            <div className="caw-avatar">A</div>
            <div className="caw-header-info">
              <h3>{AGENT_NAME}</h3>
              <span><span className="caw-online" />{AGENT_ROLE}</span>
            </div>
          </div>

          <div className="caw-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`caw-msg ${msg.sender_type === 'visitor' ? 'visitor' : 'agent'}`}>
                {msg.sender_type !== 'visitor' && <div className="caw-msg-name">{AGENT_NAME}</div>}
                <div>{msg.content}</div>
                {msg.created_at && <div className="caw-msg-time">{formatTime(msg.created_at)}</div>}
              </div>
            ))}
            {isLoading && (
              <div className="caw-typing">
                <div className="caw-dot" />
                <div className="caw-dot" />
                <div className="caw-dot" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="caw-input-area">
            <input
              ref={inputRef}
              className="caw-input"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button className="caw-send" onClick={handleSend}>
              <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>

          <div className="caw-powered">Global Label • Rótulos Inteligentes</div>
        </div>
      )}
    </>
  )
}
