import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './main.css';
import TechCarousel from '../TechCarousel/TechCarousel';
import RepoImage from './RepoImage';

const Main = () => {
  const { t } = useTranslation();
  const [currentActive, setcurrentActive] = useState('all');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const CACHE_KEY = 'gh_repos_cache';
    const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

    /**
     * Fetch repositories from the GitHub API with localStorage caching.
     * Uses an AbortController to cancel the request on unmount and guards
     * against state updates when the component is no longer mounted.
     */
    async function loadRepos() {
      try {
        setIsLoading(true);
        setError('');

        // Check localStorage cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            if (isMounted) {
              setRepos(Array.isArray(data) ? data : []);
              setIsLoading(false);
            }
            return;
          }
        }

        const response = await fetch(
          'https://api.github.com/users/Soufiane-64/repos?sort=updated&per_page=100',
          {
            headers: {
              Accept: 'application/vnd.github+json'
            },
            signal: controller.signal
          }
        );

        // Handle rate limiting
        if (response.status === 403 || response.status === 429) {
          // Try to serve cached data even if stale
          if (cached) {
            const { data } = JSON.parse(cached);
            if (isMounted) setRepos(Array.isArray(data) ? data : []);
            return;
          }
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setRepos(Array.isArray(data) ? data : []);
          localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        }
      } catch {
        if (isMounted) {
          // Try stale cache as fallback
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            const { data } = JSON.parse(cached);
            setRepos(Array.isArray(data) ? data : []);
          } else {
            setError('Failed to load repositories.');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadRepos();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const filteredRepos = useMemo(() => {
    if (currentActive === 'all') {
      return repos;
    }
    const byLang = (lang) =>
      repos.filter((r) => (r.language || '').toLowerCase() === lang);

    switch (currentActive) {
      case 'css':
        return byLang('css');
      case 'js': {
        // Include both JS and TS for broader coverage
        return repos.filter((r) => {
          const lang = (r.language || '').toLowerCase();
          return lang === 'javascript' || lang === 'typescript';
        });
      }
      case 'react': {
        // Best-effort: detect React by name/description containing "react"
        return repos.filter((r) => {
          const lang = (r.language || '').toLowerCase();
          const txt = `${r.name ?? ''} ${(r.description ?? '')}`.toLowerCase();
          const looksReact = txt.includes('react');
          return looksReact || lang === 'tsx'; // relaxed heuristic
        });
      }
      case 'php':
        return byLang('php');
      case 'python':
        return byLang('python');
      case 'java':
        return byLang('java');
      default:
        return repos;
    }
  }, [repos, currentActive]);

  const projectsToRender = filteredRepos.length ? filteredRepos : [];

  // (Carousel reads technologies from i18n resume data internally)

  return (
    <>
      <TechCarousel />
      <main className="flex">
        <section className="flex left-section">
          <button
            onClick={() => {
              setcurrentActive('all');
            }}
            className={currentActive === 'all' ? 'active' : undefined}
          >
            {t('projects.allProjects')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('css');
            }}
            className={currentActive === 'css' ? 'active' : undefined}
          >
            {t('projects.htmlCss')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('js');
            }}
            className={currentActive === 'js' ? 'active' : undefined}
          >
            {t('projects.javascript')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('react');
            }}
            className={currentActive === 'react' ? 'active' : undefined}
          >
            {t('projects.react')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('php');
            }}
            className={currentActive === 'php' ? 'active' : undefined}
          >
            {t('projects.php')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('python');
            }}
            className={currentActive === 'python' ? 'active' : undefined}
          >
            {t('projects.python')}
          </button>
          <button
            onClick={() => {
              setcurrentActive('java');
            }}
            className={currentActive === 'java' ? 'active' : undefined}
          >
            {t('projects.java')}
          </button>
        </section>
        <section className="flex right-section">
          {isLoading && (
            [...Array(6)].map((_, index) => (
              <article key={`skeleton-${index}`} className="card">
                <div
                  className="image-container"
                  style={{ width: '266px', height: '200px', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))' }}
                >
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', opacity: 0.0 }}
                    src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
                    alt="loading"
                  />
                </div>
                <div style={{ width: '266px' }} className="box">
                  <h1 className="title">{t('projects.loading')}</h1>
                  <p className="sub-title">{t('projects.fetchingRepos')}</p>
                  <div className="card-footer flex space-between">
                    <div className="icon-group flex">
                      <i className="fa-solid fa-link icon" />
                      <i className="fa-brands fa-github icon" />
                    </div>
                    <span className="more-link flex">{t('projects.more')}<i style={{ alignSelf: 'end' }} className="fa-solid fa-arrow-right icon" /></span>
                  </div>
                </div>
              </article>
            ))
          )}

          {!isLoading && error && (
            <article className="card" style={{ padding: '1rem' }}>
              <div className="box" style={{ width: '266px' }}>
                <h1 className="title">{t('projects.error')}</h1>
                <p className="sub-title">{error}</p>
              </div>
            </article>
          )}

          {!isLoading && !error && projectsToRender.map((repo, index) => {
            const homepage = repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null;
            const repoUrl = repo.html_url;
            const description = repo.description || t('projects.noDescription');
            const title = repo.name;
            return (
              <article key={repo.id} className="card">
                <div
                  className="image-container"
                  style={{ width: '266px', height: '200px', overflow: 'hidden' }}
                >
                  <RepoImage repo={repo} index={index} />
                </div>
                <div style={{ width: '266px' }} className="box">
                  <h1 className="title">{title}</h1>
                  <p className="sub-title">{description}</p>

                  <div className="card-footer flex space-between">
                    <div className="icon-group flex">
                      {homepage ? (
                        <a href={homepage} target="_blank" rel="noopener noreferrer" title={t('projects.livesite')}>
                          <i className="fa-solid fa-link icon" />
                        </a>
                      ) : (
                        <i className="fa-solid fa-link icon" title={t('projects.livesite')} />
                      )}
                      <a href={repoUrl} target="_blank" rel="noopener noreferrer" title={t('projects.github')}>
                        <i className="fa-brands fa-github icon" />
                      </a>
                    </div>

                    <a className="more-link flex" href={repoUrl} target="_blank" rel="noopener noreferrer">
                      {t('projects.more')}
                      <i
                        style={{ alignSelf: 'end' }}
                        className="fa-solid fa-arrow-right icon"
                      />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default Main;
