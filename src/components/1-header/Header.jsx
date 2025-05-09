import { useState } from 'react';
import './header.css';

const Header = () => {
  const [showModal, setshowModal] = useState(false);

  return (
    <header className="flex">
      {/* Menu Button (hamburger) */}
      <button
        onClick={() => setshowModal(true)}
        className="icon-button menu flex"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <div />

      {/* Nav Links */}
      <nav>
        <ul className="flex">
          <li><a href="#about">About</a></li>
          <li><a href="#articles">Articles</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#speaking">Speaking</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Dark Mode Toggle */}
      <button className="icon-button mode flex">
        <i className="fa-regular fa-moon"></i>
      </button>

      {/* Modal Menu */}
      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li className="border">
              <button
                className="icon-close"
                onClick={() => setshowModal(false)}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </li>
            <li><a href="#about">About</a></li>
            <li><a href="#articles">Articles</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#speaking">Speaking</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
