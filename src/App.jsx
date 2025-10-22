import Header from './components/1-header/Header';
import Hero from './components/2-hero/Hero';
import Main from './components/3-main/Main';
import Resume from './components/3.5-resume/Resume';
import Contact from './components/4-contact/Contact';
import Footer from './components/5-footer/Footer';

/**
 * The main App component that renders the application layout.
 * It includes Header, Hero, Main, Resume, Contact, and Footer components.
 */
function App() {
  return (
    <div id="up" className="container">
      <Header />
      <Hero />
      <div id ="projects" className="divider" />
      <Main />
      <div id ="resume" className="divider" />
      <Resume />
      <div id ="contact" className="divider" />
      <Contact />
      <div className="divider" />
      <Footer />
      <a href="#up">
        <button className="fa-solid fa-angle-up scroll2Top" />
      </a>
    </div>
  );
}

export default App;
