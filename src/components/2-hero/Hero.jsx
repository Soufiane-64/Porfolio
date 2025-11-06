// ...existing code...
import './hero.css';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';

const Hero = () => {
  const { t } = useTranslation();
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const blobsRef = useRef([]);
  const avatarRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Simplified avatar animation: gentle float loop
  const initSimpleAvatarAnim = () => {
    if (!avatarRef.current) return;
    gsap.to(avatarRef.current, {
      y: -6,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  };

  // Check theme on component mount and when theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isLightMode = document.documentElement.classList.contains('light');
      const newIsDarkMode = !isLightMode;
      if (newIsDarkMode !== isDarkMode) {
        setIsDarkMode(newIsDarkMode);
      }
    };

    // Check initial theme
    checkTheme();

    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [isDarkMode]);

  useEffect(() => {
    const rootEl = rootRef.current;
    const cardEl = cardRef.current;

    if (!rootEl || !cardEl) {
      return;
    }

    let moveListener = null;
    let cardMoveListener = null;
    let cardLeaveListener = null;

    const ctx = gsap.context(() => {
      // entrance for the card
      gsap.fromTo(
        cardEl,
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );

      // stagger screens
      const screens = cardEl.querySelectorAll('.screen');
      gsap.fromTo(
        screens,
        { y: 18, opacity: 0, scale: 0.9, rotation: -2 },
        { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.3)', stagger: 0.12 }
      );
      gsap.to(screens, {
        y: '-=6',
        rotation: 'random(-3,3)',
        duration: 3.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.18 }
      });

      // blobs
      gsap.to(blobsRef.current, {
        y: '-=12',
        x: 'random(-10,10)',
        rotation: 'random(-6,6)',
        duration: 3.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.25 }
      });

      // mouse parallax
      const handleMove = (e) => {
        const rect = rootEl.getBoundingClientRect();
        const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
        blobsRef.current.forEach((b, i) => {
          if (!b) {
            return;
          }
          const depth = (i + 1) * 8;
          gsap.to(b, { x: relX * depth, y: relY * depth, duration: 0.6, ease: 'power3.out' });
        });
      };

      rootEl.addEventListener('mousemove', handleMove);
      moveListener = handleMove;

      // card tilt
      const handleCardMove = (e) => {
        const rect = cardEl.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 6;
        const rotateX = (0.5 - py) * 6;
        gsap.to(cardEl, { rotateY, rotateX, duration: 0.4, ease: 'power3.out' });
      };
      const resetCard = () => gsap.to(cardEl, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });

      cardEl.addEventListener('pointermove', handleCardMove);
      cardEl.addEventListener('pointerleave', resetCard);
      cardMoveListener = handleCardMove;
      cardLeaveListener = resetCard;
    }, rootEl);

    return () => {
      if (moveListener) {
        rootEl.removeEventListener('mousemove', moveListener);
      }
      if (cardMoveListener) {
        cardEl.removeEventListener('pointermove', cardMoveListener);
      }
      if (cardLeaveListener) {
        cardEl.removeEventListener('pointerleave', cardLeaveListener);
      }
      ctx.revert();
    };
  }, []);

  // init simple avatar float once
  useEffect(() => {
    initSimpleAvatarAnim();
  }, []);

  return (
    <section className="hero flex" ref={rootRef}>
      <div className="left-section">
        <div className="parent-avatar flex">
          <img
            ref={avatarRef}
            src={isDarkMode ? './avatar_black.png' : './avatar_white.png'}
            className="avatar"
            alt="Soufiane Hammagi — avatar"
          />
          <i className="fa-solid fa-circle-check icon-verified" aria-hidden />
        </div>

        <h1 className="title">
          <span className="gradient-text">{t('hero.title')}</span>
        </h1>

        <p className="sub-title">
          {t('hero.description')}
        </p>

        <div className="controls flex">
          <a className="btn primary" href="#projects" aria-label="See projects">{t('hero.viewProjects')}</a>
          <a className="btn outline" href="/SoufianeHammagiResume.pdf" download aria-label="Download CV">{t('hero.downloadCV')}</a>
        </div>

        <div className="all-icons flex" role="navigation" aria-label="social links">
          <a href="https://www.linkedin.com/in/soufiane-hammagi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="icon-link">
            <i className="fa-brands fa-linkedin icon" />
          </a>
          <a href="https://github.com/Soufiane-64" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="icon-link">
            <i className="fa-brands fa-github icon" />
          </a>
          <a href="https://x.com/SoufianeHammagi" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="icon-link">
            <i className="fa-brands fa-x-twitter icon" />
          </a>
          <a href="https://www.instagram.com/soufiane.64/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-link">
            <i className="fa-brands fa-instagram icon" />
          </a>
        </div>
      </div>

      <div className="right-section animation" aria-hidden="true">
        <div
          className="blob b1"
          ref={(el) => {
            if (el) {
              blobsRef.current[0] = el;
            }
          }}
        />
        <div
          className="blob b2"
          ref={(el) => {
            if (el) {
              blobsRef.current[1] = el;
            }
          }}
        />
        <div
          className="blob b3"
          ref={(el) => {
            if (el) {
              blobsRef.current[2] = el;
            }
          }}
        />
        <div className="hero-card" ref={cardRef}>
          <div className="mini-screens" aria-hidden>
            <div className="screen s1" />
            <div className="screen s2" />
            <div className="screen s3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;