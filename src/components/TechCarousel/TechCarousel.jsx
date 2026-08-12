import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { buildIconCandidates, handleIconError } from '../../utils/buildIconCandidates';
import './TechCarousel.css';

const TechCarousel = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
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
  }, [resumeData.skills]);
  const carouselRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(0);

  useEffect(() => {
    if (technologies.length === 0 || !carouselRef.current) return;
    const carousel = carouselRef.current;
    const set = carousel.querySelector('.tech-icon-set');
    if (!set) return;
    const segmentWidth = set.scrollWidth + 48;
    const speed = 40;

    const tick = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) / 1000;
      const x = -(elapsed * speed) % segmentWidth;
      carousel.style.transform = `translate3d(${x}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [technologies]);

  const createIconSet = (setIndex) => (
    <div key={setIndex} className="tech-icon-set">
      {technologies.map((skill, index) => {
        const candidates = buildIconCandidates(skill, isDarkMode);
        const first = candidates[0] || '';
        return (
          <div key={`${setIndex}-${index}`} className="tech-icon">
            {first ? (
              <img
                className="tech-icon-img"
                src={first}
                width={56}
                height={56}
                alt={`${skill} logo`}
                data-idx="0"
                data-candidates={candidates.join(',')}
                onError={handleIconError}
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
      <div className="tech-carousel" ref={carouselRef} key={isDarkMode ? 'dark' : 'light'}>
        {createIconSet(0)}
        {createIconSet(1)}
        {createIconSet(2)}
      </div>
    </div>
  );
};

export default TechCarousel;