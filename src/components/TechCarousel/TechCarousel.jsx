import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import './TechCarousel.css';

const buildIconCandidates = (name) => {
  const lower = String(name || '').toLowerCase();
  const c = [];
  if (/(openai|chatgpt)/.test(lower)) c.push('https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg');
  if (/cursor/.test(lower)) c.push('/icons/cursor.jpg','/icons/cursor.png','/icons/cursor.svg','/icons/cursor.webp','https://raw.githubusercontent.com/getcursor/cursor/main/public/icon.png');
  if (/tailwind/.test(lower)) c.push('/icons/tailwind.svg','/icons/tailwind.png','/icons/tailwind.jpg','/icons/tailwind.webp','https://cdn.simpleicons.org/tailwindcss/38BDF8');
  if (/docker/.test(lower)) c.push('/icons/docker.svg','/icons/docker.png','/icons/docker.jpg','/icons/docker.webp','https://cdn.simpleicons.org/docker/2496ED');
  if (/(webix)/.test(lower)) c.push('/icons/webix.png','/icons/webix.jpg','/icons/webix.webp','/icons/webix.svg');
  if (/(ext\s?js|extjs|sencha)/.test(lower)) c.push('/icons/extjs.png','/icons/extjs.jpg','/icons/extjs.webp','/icons/extjs.svg');
  if (/(scrum)/.test(lower)) c.push('/icons/scrum.png','/icons/scrum.jpg','/icons/scrum.webp','/icons/scrum.svg');
  if (/(merise)/.test(lower)) c.push('/icons/merise.png','/icons/merise.jpg','/icons/merise.webp','/icons/merise.svg');
  if (/(uml)/.test(lower)) c.push('/icons/uml.png','/icons/uml.jpg','/icons/uml.webp','/icons/uml.svg');
  if (/^html(5)?$/.test(lower)) c.push('/icons/html.svg','/icons/html.png','/icons/html.jpg','/icons/html.webp','https://cdn.simpleicons.org/html5/E34F26');
  if (/^css(3)?$/.test(lower)) c.push('/icons/css.svg','/icons/css.png','/icons/css.jpg','/icons/css.webp','https://cdn.simpleicons.org/css3/1572B6');
  if (/(^|\b)angular(\b|$)/.test(lower)) c.push('/icons/angular.svg','/icons/angular.png','/icons/angular.jpg','/icons/angular.webp','https://cdn.simpleicons.org/angular/DD0031');
  if (/(jinja)/.test(lower)) c.push('/icons/jinja.png','/icons/jinja.jpg','/icons/jinja.webp','/icons/jinja.svg');
  const deviconMap = {
    javascript: 'javascript/javascript-original',
    typescript: 'typescript/typescript-original',
    php: 'php/php-original',
    'c#': 'csharp/csharp-original',
    csharp: 'csharp/csharp-original',
    python: 'python/python-original',
    react: 'react/react-original',
    angular: 'angular/angular-original',
    html: 'html5/html5-original',
    html5: 'html5/html5-original',
    css: 'css3/css3-original',
    css3: 'css3/css3-original',
    redux: 'redux/redux-original',
    'next.js': 'nextjs/nextjs-original',
    nextjs: 'nextjs/nextjs-original',
    laravel: 'laravel/laravel-original',
    symfony: 'symfony/symfony-original',
    graphql: 'graphql/graphql-plain',
    mysql: 'mysql/mysql-original',
    'sql server': 'microsoftsqlserver/microsoftsqlserver-plain',
    docker: 'docker/docker-original',
    git: 'git/git-original',
    github: 'github/github-original',
    svn: 'subversion/subversion-original',
    tailwind: 'tailwindcss/tailwindcss-plain',
    flask: 'flask/flask-original',
    jinja: 'jinja/jinja-original',
    vscode: 'vscode/vscode-original'
  };
  const di = deviconMap[lower];
  if (di) c.push(`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${di}.svg`);
  return c;
};

const TechCarousel = () => {
  const { t } = useTranslation();
  const resumeData = t('resumeData', { returnObjects: true }) || {};
  const technologies = useMemo(() => {
    const s = resumeData.skills || {};
    const list = [
      ...(s.programming_languages || []),
      ...(s.frontend || []),
      ...(s.backend || []),
      ...(s.databases || []),
      ...(s.tools || []),
      ...(s.methods || []),
      ...(s.modeling || [])
    ];
    return Array.from(new Map(list.map(n => [String(n).toLowerCase(), n])).values());
  }, [resumeData]);
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  const initializeAnimation = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const set = carousel.querySelector('.tech-icon-set');
    if (!set) return;
    const totalWidth = set.scrollWidth + 48;

    // Create infinite scroll animation
    animationRef.current = gsap.to(carousel, {
      x: -totalWidth,
      duration: totalWidth / 40, // 40 pixels per second
      ease: 'none',
      repeat: -1,
      paused: false
    });
  };

  useEffect(() => {
    if (technologies.length > 0) {
      initializeAnimation();
    }

    return () => {
      // Cleanup animation on unmount
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [technologies]);

  const handleIconHover = (event, isHovering) => {
    const icon = event.currentTarget;
    const color = icon.dataset.color;

    if (isHovering) {
      // Pause the main animation
      if (animationRef.current) {
        animationRef.current.pause();
      }

      // Scale up and change color
      gsap.to(icon, {
        scale: 1.3,
        color: color,
        filter: `drop-shadow(0 4px 20px ${color}50)`,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      // Resume the main animation
      if (animationRef.current) {
        animationRef.current.resume();
      }

      // Return to default state
      gsap.to(icon, {
        scale: 1,
        color: '#64748b',
        filter: 'none',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  // Create multiple sets for seamless infinite loop
  const createIconSet = (setIndex) => (
    <div key={setIndex} className="tech-icon-set">
      {technologies.map((skill, index) => {
        const candidates = buildIconCandidates(skill);
        const first = candidates[0] || '';
        return (
          <div
            key={`${setIndex}-${index}`}
            className="tech-icon"
            onMouseEnter={(e) => handleIconHover(e, true)}
            onMouseLeave={(e) => handleIconHover(e, false)}
          >
            {first ? (
              <img
                className="tech-icon-img"
                src={first}
                width={56}
                height={56}
                alt={`${skill} logo`}
                data-idx="0"
                data-candidates={candidates.join(',')}
                onError={(e) => {
                  const el = e.currentTarget;
                  const list = (el.getAttribute('data-candidates') || '').split(',').filter(Boolean);
                  let i = parseInt(el.getAttribute('data-idx') || '0', 10) + 1;
                  if (i < list.length) {
                    el.setAttribute('data-idx', String(i));
                    el.src = list[i];
                  }
                }}
              />
            ) : (
              <span className="tech-badge">{skill}</span>
            )}
          </div>
        );
      })}
    </div>
  );

  // Removed loading/error states; carousel builds from i18n resume data

  // Show empty state
  if (technologies.length === 0) {
    return (
      <div className="tech-carousel-container">
        <div className="tech-carousel-empty">
          <i className="fas fa-code" />
          <span>No technologies found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="tech-carousel-container">
      <div className="tech-carousel" ref={carouselRef}>
        {createIconSet(0)}
        {createIconSet(1)}
        {createIconSet(2)}
      </div>
    </div>
  );
};

export default TechCarousel;