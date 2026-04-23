import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import LogoStrip from './components/LogoStrip'
import About from './components/About'
import Products from './components/Products'
import Industries from './components/Industries'
import Quality from './components/Quality'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

function App() {
  useEffect(() => {
    // Scroll reveal logic
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    const kickInView = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (r.top < vh - 20 && r.bottom > 0) {
          el.classList.add('in');
        } else {
          io.observe(el);
        }
      });
    };

    requestAnimationFrame(kickInView);

    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <About />
        <Products />
        <Industries />
        <Quality />
        <ContactCTA />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}

export default App
