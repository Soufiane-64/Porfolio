import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { buildIconCandidates, handleIconError } from '../../utils/buildIconCandidates';
import './resume.css';

const GlobeLanguages = lazy(() => import('../GlobeLanguages/GlobeLanguages'));

const Resume = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const resumeData = t('resumeData', { returnObjects: true });

  const uniqueSkills = useMemo(() => {
    const all = [
      ...resumeData.skills.programming_languages,
      ...resumeData.skills.frontend,
      ...resumeData.skills.backend,
      ...resumeData.skills.databases,
      ...resumeData.skills.tools,
      ...resumeData.skills.methods,
      ...resumeData.skills.modeling
    ];
    return Array.from(new Map(all.map((n) => [String(n).toLowerCase(), n])).values());
  }, [resumeData.skills]);

  // Defer mounting the Three.js globe until it's about to scroll into view.
  const [globeVisible, setGlobeVisible] = useState(false);
  const globeAnchorRef = useRef(null);

  useEffect(() => {
    const el = globeAnchorRef.current;
    if (!el || globeVisible) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGlobeVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [globeVisible]);

  const formatDate = (dateString) => {
    const [year, month] = (dateString || '').split('-');
    const d = new Date(Number(year), Number(month) - 1, 1);
    if (Number.isNaN(d.getTime())) return dateString;
    try {
      return d.toLocaleDateString(i18n.resolvedLanguage || i18n.language || 'en', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return `${month}/${year}`;
    }
  };

  const getFlagMetaForLanguage = (languageName) => {
    if (!languageName) return { code: 'un', alt: 'Language' };
    const normalized = languageName
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '');

    if (/(arab|arabe|arabisch)/.test(normalized)) return { code: 'ma', alt: 'Arabic' };
    if (/(german|allemand|alem[aá]n|deutsch)/.test(normalized)) return { code: 'de', alt: 'German' };
    if (/(english|anglais|ingles|englisch)/.test(normalized)) return { code: 'gb', alt: 'English' };
    if (/(french|francais|frances|franzosisch)/.test(normalized)) return { code: 'fr', alt: 'French' };
    if (/(spanish|espagnol|espanol|spanisch)/.test(normalized)) return { code: 'es', alt: 'Spanish' };
    return { code: 'un', alt: 'Language' };
  };

  return (
    <section className="resume-section">
      <h1 className="resume-title">
        <i className="fa-solid fa-file-lines" />
        {t('resume.title')}
      </h1>
      <p className="resume-subtitle">
        {t('resume.subtitle')}
      </p>

      <div className="resume-container">
        <div className="experience-education-grid">
          {/* Experience Section */}
          <div className="resume-block">
            <h2 className="section-title">
              <i className="fa-solid fa-briefcase" />
              {t('resume.experience')}
            </h2>
            <div className="timeline">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="position-title">{exp.title}</h3>
                      <span className="date-range">
                        {formatDate(exp.start)} - {formatDate(exp.end)}
                      </span>
                    </div>
                    <div className="company-info">
                      <span className="company-name">{exp.company}</span>
                      <span className="location">
                        <i className="fa-solid fa-location-dot" />
                        {exp.location}
                      </span>
                    </div>
                    <ul className="highlights-list">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="resume-block">
            <h2 className="section-title">
              <i className="fa-solid fa-graduation-cap" />
              {t('resume.education')}
            </h2>
            <div className="timeline">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3 className="position-title">{edu.degree}</h3>
                      <span className="date-range">
                        {formatDate(edu.start)} - {formatDate(edu.end)}
                      </span>
                    </div>
                    <div className="company-info">
                      <span className="company-name">{edu.institution}</span>
                      <span className="location">
                        <i className="fa-solid fa-location-dot" />
                        {edu.location}
                      </span>
                    </div>
                    <p className="edu-details" style={{ whiteSpace: 'pre-line' }}>{(edu.details || '').replaceAll(';', '\n')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Languages Grid */}
        <div className="skills-languages-grid">
          {/* Skills Section - Tech Grid */}
          <div className="resume-block skills-block">
            <h2 className="section-title">
              <i className="fa-solid fa-code" />
              {t('resume.skills')}
            </h2>
            <div className="tech-grid" role="list" key={isDarkMode ? 'dark' : 'light'}>
              {uniqueSkills.map((skill, idx) => {
                const candidates = buildIconCandidates(skill, isDarkMode);
                const iconSrc = candidates[0] || null;
                return (
                  <div className="tech-item" key={`${skill}-${idx}`} role="listitem">
                    {iconSrc ? (
                      <img
                        className="tech-icon"
                        src={iconSrc}
                        alt={`${skill} logo`}
                        loading="lazy"
                        data-idx="0"
                        data-candidates={candidates.join(',')}
                        onError={handleIconError}
                      />
                    ) : (
                      <div className="tech-icon placeholder" aria-hidden>{String(skill).charAt(0)}</div>
                    )}
                    <span className="tech-label" title={skill}>{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Languages Section */}
          <div className="resume-block languages-block">
            <h2 className="section-title">
              <i className="fa-solid fa-language" />
              {t('resume.languages')}
            </h2>
            <div className="languages-container">
              {resumeData.languages.map((lang, index) => {
                const flag = getFlagMetaForLanguage(lang.name);
                const src = `https://flagcdn.com/24x18/${flag.code}.png`;
                const src2x = `https://flagcdn.com/48x36/${flag.code}.png`;
                return (
                  <div key={index} className="language-item">
                    <div className="language-header">
                      <img className="flag-img" src={src} srcSet={`${src2x} 2x`} width="24" height="18" alt={`${flag.alt} flag`} />
                      <span className="language-name">{lang.name}</span>
                    </div>
                    <span className="language-level">{lang.level}</span>
                  </div>
                );
              })}
            </div>

            {/* World languages visualization — mounted only once scrolled near */}
            <div ref={globeAnchorRef} className="globe-languages-anchor">
              {globeVisible && (
                <Suspense fallback={null}>
                  <GlobeLanguages />
                </Suspense>
              )}
            </div>

            {/* Download Resume Button */}
            <div className="download-resume">
              <a
                href="/SoufianeHammagiResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                <i className="fa-solid fa-download" />
                {t('resume.downloadResume')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
