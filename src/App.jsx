import Header from './components/1-header/Header';
import Hero from './components/2-hero/Hero';
import Main from './components/3-main/Main';
import Resume from './components/3.5-resume/Resume';
import Contact from './components/4-contact/Contact';
import Footer from './components/5-footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

/**
 * The main App component that renders the application layout.
 * It includes Header, Hero, Main, Resume, Contact, and Footer components.
 */
function App() {
  return (
    <div id="up" className="container">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <div id ="projects" className="divider" />
      <main id="main-content">
        <ErrorBoundary>
          <Main />
        </ErrorBoundary>
      </main>
      <div id ="resume" className="divider" />
      <ErrorBoundary>
        <Resume />
      </ErrorBoundary>
      <div id ="contact" className="divider" />
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      <div className="divider" />
      <Footer />
      <button
        className="scroll2Top"
        onClick={() => { document.getElementById('up')?.scrollIntoView({ behavior: 'smooth' }); }}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-angle-up" />
      </button>
    </div>
  );
}

export default App;
