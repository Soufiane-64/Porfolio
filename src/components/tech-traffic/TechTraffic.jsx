import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './tech-traffic.css';

// modern Font Awesome icon set (uses FA classes)
const logos = [
  { name: 'Vite', icon: 'fa-solid fa-bolt', color: '#646CFF', glow: 'rgba(100,108,255,0.18)', bg: 'rgba(100,108,255,0.06)' },
  { name: 'React', icon: 'fa-brands fa-react', color: '#61DAFB', glow: 'rgba(97,218,251,0.16)', bg: 'rgba(97,218,251,0.06)' },
  { name: 'TypeScript', icon: 'fa-solid fa-code', color: '#3178C6', glow: 'rgba(49,120,198,0.14)', bg: 'rgba(49,120,198,0.04)' },
  { name: 'Tailwind', icon: 'fa-solid fa-wind', color: '#38B2AC', glow: 'rgba(56,178,172,0.14)', bg: 'rgba(56,178,172,0.04)' },
  { name: 'Next.js', icon: 'fa-solid fa-angle-right', color: '#000000', glow: 'rgba(0,0,0,0.18)', bg: 'rgba(0,0,0,0.06)' },
  { name: 'Node.js', icon: 'fa-brands fa-node-js', color: '#83CD29', glow: 'rgba(131,205,41,0.12)', bg: 'rgba(131,205,41,0.04)' },
  { name: 'Docker', icon: 'fa-brands fa-docker', color: '#2496ED', glow: 'rgba(36,150,237,0.12)', bg: 'rgba(36,150,237,0.04)' },
  { name: 'Prisma', icon: 'fa-solid fa-database', color: '#0EA5A3', glow: 'rgba(14,165,163,0.12)', bg: 'rgba(14,165,163,0.04)' },
  { name: 'GraphQL', icon: 'fa-solid fa-project-diagram', color: '#E535AB', glow: 'rgba(229,53,171,0.12)', bg: 'rgba(229,53,171,0.04)' },
  { name: 'Postgres', icon: 'fa-solid fa-server', color: '#316192', glow: 'rgba(49,97,146,0.12)', bg: 'rgba(49,97,146,0.04)' },
  { name: 'GitHub', icon: 'fa-brands fa-github', color: '#181717', glow: 'rgba(24,23,23,0.18)', bg: 'rgba(24,23,23,0.06)' }
];

const TechTraffic = () => {
  const sectionRef = useRef(null);
  const lanesRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!sectionEl) {
      return;
    }

    const running = [];

    // Build timelines per lane
    lanesRef.current.forEach((laneEl, idx) => {
      if (!laneEl) {
        return;
      }

      const content = laneEl.querySelector('.lane-content');
      if (!content) {
        return;
      }

      const clone = content.cloneNode(true);
      laneEl.appendChild(clone);

      if (prefersReduced) {
        return;
      }

      // single-direction smooth, slower loop for polished look
      const direction = 1; // left-to-right
      const duration = 50 + Math.random() * 10; // 50-60s for slow smooth motion

      const tl = gsap.to(content, {
        xPercent: direction === 1 ? 100 : -100,
        duration: duration,
        ease: 'power1.inOut',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 100)
        }
      });

      gsap.to(clone, {
        xPercent: direction === 1 ? 100 : -100,
        duration: duration,
        ease: 'power1.inOut',
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100, 100)
        }
      });

      // subtle vertical float for icons to add life
      const icons = laneEl.querySelectorAll('.badge i');
      gsap.to(icons, {
        y: '+=6',
        duration: 3.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.12
      });

      running.push(tl);
    });

    const handleEnter = () => {
      running.forEach((t) => t && t.pause());
    };
    const handleLeave = () => {
      running.forEach((t) => t && t.play());
    };

    sectionEl.addEventListener('mouseenter', handleEnter);
    sectionEl.addEventListener('mouseleave', handleLeave);

    return () => {
      sectionEl.removeEventListener('mouseenter', handleEnter);
      sectionEl.removeEventListener('mouseleave', handleLeave);
      running.forEach((t) => t && t.kill());
    };
  }, []);

  const lanes = [0];

  return (
    <section id="tech-traffic" className="tech-traffic single" ref={sectionRef} aria-label="Tools & Skills">
      <h2 className="tt-title">Tools & Skills</h2>
      <div className="tt-container">
        {lanes.map((_, idx) => (
          <div
            key={idx}
            className={`lane lane-${idx}`}
            ref={(el) => { lanesRef.current[idx] = el; }}
            aria-hidden={false}
          >
            <div className="lane-content">
              {logos.map((l, i) => (
                <div
                  className="badge"
                  key={i}
                  role="img"
                  aria-label={l.name}
                  style={{ '--icon-color': l.color, '--icon-glow': l.glow, '--icon-bg': l.bg }}
                >
                  <i className={l.icon} aria-hidden="true" title={l.name} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechTraffic;
