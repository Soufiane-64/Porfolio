import { useTranslation } from 'react-i18next';
import './resume.css';

const Resume = () => {
  const { t, i18n } = useTranslation();
  const resumeData = t('resumeData', { returnObjects: true });

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
            {(() => {
              const knownIconMap = (name) => {
                const key = String(name || '').toLowerCase();
                if (/jinja/.test(key)) return 'jinja/jinja-original';
                // devicon icon keys
                const map = {
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
                return map[key] || null;
              };

              const iconCandidates = (name) => {
                const key = String(name || '').toLowerCase();
                if (key === 'laravel') {
                  return [
                    'laravel/laravel-original',
                    'laravel/laravel-plain',
                    'laravel/laravel-original-wordmark',
                    'laravel/laravel-plain-wordmark'
                  ];
                }
                const primary = knownIconMap(name);
                return primary ? [primary] : [];
              };

              const toItems = [
                ...resumeData.skills.programming_languages,
                ...resumeData.skills.frontend,
                ...resumeData.skills.backend,
                ...resumeData.skills.databases,
                ...resumeData.skills.tools,
                ...resumeData.skills.methods,
                ...resumeData.skills.modeling
              ];
              const unique = Array.from(new Map(toItems.map(n => [String(n).toLowerCase(), n])).values());
              return (
                <div className="tech-grid" role="list">
                  {unique.map((skill, idx) => {
                    const lower = String(skill || '').toLowerCase();
                    // Custom absolute URL candidates (non-devicon)
                    let absoluteCandidates = [];
                    if (/(openai|chatgpt)/.test(lower)) {
                      absoluteCandidates = [
                        'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg'
                      ];
                    } else if (/cursor/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/cursor.jpg',
                        '/icons/cursor.png',
                        '/icons/cursor.svg',
                        '/icons/cursor.webp',
                        'https://raw.githubusercontent.com/getcursor/cursor/main/apps/cursor/public/icon.png',
                        'https://raw.githubusercontent.com/getcursor/cursor/main/public/icon.png'
                      ];
                    } else if (/tailwind/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/tailwind.svg',
                        '/icons/tailwind.png',
                        '/icons/tailwind.jpg',
                        '/icons/tailwind.webp',
                        'https://cdn.simpleicons.org/tailwindcss/38BDF8',
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg'
                      ];
                    } else if (/(^|\b)docker(\b|$)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/docker.svg',
                        '/icons/docker.png',
                        '/icons/docker.jpg',
                        '/icons/docker.webp',
                        'https://cdn.simpleicons.org/docker/2496ED'
                      ];
                    } else if (/^(html|html5)$/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/html.svg',
                        '/icons/html.png',
                        '/icons/html.jpg',
                        '/icons/html.webp',
                        'https://cdn.simpleicons.org/html5/E34F26',
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'
                      ];
                    } else if (/^(css|css3)$/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/css.svg',
                        '/icons/css.png',
                        '/icons/css.jpg',
                        '/icons/css.webp',
                        'https://cdn.simpleicons.org/css3/1572B6',
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'
                      ];
                    } else if (/(^|\b)angular(\b|$)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/angular.svg',
                        '/icons/angular.png',
                        '/icons/angular.jpg',
                        '/icons/angular.webp',
                        'https://cdn.simpleicons.org/angular/DD0031',
                        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg'
                      ];
                    } else if (/(webix)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/webix.png',
                        '/icons/webix.jpg',
                        '/icons/webix.webp',
                        '/icons/webix.svg'
                      ];
                    } else if (/(ext\s?js|extjs|sencha)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/extjs.png',
                        '/icons/extjs.jpg',
                        '/icons/extjs.webp',
                        '/icons/extjs.svg'
                      ];
                    } else if (/(scrum)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/scrum.png',
                        '/icons/scrum.jpg',
                        '/icons/scrum.webp',
                        '/icons/scrum.svg'
                      ];
                    } else if (/(merise)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/merise.png',
                        '/icons/merise.jpg',
                        '/icons/merise.webp',
                        '/icons/merise.svg'
                      ];
                    } else if (/(uml)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/uml.png',
                        '/icons/uml.jpg',
                        '/icons/uml.webp',
                        '/icons/uml.svg'
                      ];
                    } else if (/(jinja)/.test(lower)) {
                      absoluteCandidates = [
                        '/icons/jinja.png',
                        '/icons/jinja.jpg',
                        '/icons/jinja.webp',
                        '/icons/jinja.svg'
                      ];
                    }

                    const deviconCandidates = absoluteCandidates.length ? [] : iconCandidates(skill);
                    const iconSrc = absoluteCandidates.length
                      ? absoluteCandidates[0]
                      : (deviconCandidates.length
                        ? `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${deviconCandidates[0]}.svg`
                        : null);
                    return (
                      <div className="tech-item" key={`${skill}-${idx}`} role="listitem">
                        {iconSrc ? (
                          <img
                            className="tech-icon"
                            src={iconSrc}
                            alt={`${skill} logo`}
                            width={56}
                            height={56}
                            loading="lazy"
                            data-idx="0"
                            data-abs-candidates={absoluteCandidates.join(',')}
                            data-dev-candidates={deviconCandidates.join(',')}
                            onError={(e) => {
                              const el = e.currentTarget;
                              const idxStr = el.getAttribute('data-idx') || '0';
                              let iNext = parseInt(idxStr, 10) + 1;
                              const absList = (el.getAttribute('data-abs-candidates') || '').split(',').filter(Boolean);
                              if (absList.length && iNext < absList.length) {
                                el.setAttribute('data-idx', String(iNext));
                                el.src = absList[iNext];
                                return;
                              }
                              if (absList.length) return; // no further absolute fallbacks
                              const devList = (el.getAttribute('data-dev-candidates') || '').split(',').filter(Boolean);
                              if (devList.length && iNext < devList.length) {
                                el.setAttribute('data-idx', String(iNext));
                                el.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${devList[iNext]}.svg`;
                              }
                            }}
                          />
                        ) : (
                          <div className="tech-icon placeholder" aria-hidden>{String(skill).charAt(0)}</div>
                        )}
                        <span className="tech-label" title={skill}>{skill}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
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

