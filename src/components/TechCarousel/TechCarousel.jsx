import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TechCarousel.css';

const TechCarousel = ({ technologies = [], isLoading = false, error = null }) => {
  const carouselRef = useRef(null);
  const animationRef = useRef(null);

  const initializeAnimation = () => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const icons = carousel.querySelectorAll('.tech-icon');

    if (icons.length === 0) return;

    // Calculate total width for seamless loop
    const iconWidth = 80; // 3rem + gap
    const totalWidth = icons.length * iconWidth;

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
    if (technologies.length > 0 && !isLoading && !error) {
      initializeAnimation();
    }

    return () => {
      // Cleanup animation on unmount
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [technologies, isLoading, error]);

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
      {technologies.map((tech, index) => (
        <div
          key={`${setIndex}-${index}`}
          className="tech-icon"
          data-color={tech.color}
          onMouseEnter={(e) => handleIconHover(e, true)}
          onMouseLeave={(e) => handleIconHover(e, false)}
        >
          {tech.icon.includes('fas') || tech.icon.includes('fab') ? (
            <i className={tech.icon} />
          ) : (
            <span className="tech-badge">{tech.name}</span>
          )}
        </div>
      ))}
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="tech-carousel-container">
        <div className="tech-carousel-loading">
          <i className="fas fa-spinner fa-spin" />
          <span>Loading technologies...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="tech-carousel-container">
        <div className="tech-carousel-error">
          <i className="fas fa-exclamation-triangle" />
          <span>Failed to load technologies</span>
        </div>
      </div>
    );
  }

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