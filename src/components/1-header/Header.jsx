import { useState } from 'react';
import './header.css';

/**
 * Header component that contains the navigation bar
 * Includes About, Articles & Projects, Speaking, Contact buttons
 * and a light/dark mode toggle
 */
const Header = () => {
  const [showModal, setshowModal] = useState(false);
  return (
    <header className="flex">
      <button
        onClick={() => {
          setshowModal(true);
        }}
        className="menu icon-menu flex"
      />
      <div />
      <nav>
        <ul className="flex">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#articles">Articles</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#speaking">Speaking</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <button className="mode flex">
        <span className="icon-moon-o"></span>
      </button>

      {showModal && (
        <div className="fixed">
          <ul className="modal">
            <li className="border">
              <button
                className="icon-close"
                onClick={() => {
                  setshowModal(false);
                }}
              />
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#articles">Articles</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#speaking">Speaking</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
