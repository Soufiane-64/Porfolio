import { useEffect, useMemo, useState } from 'react';
import './main.css';
import TechCarousel from '../TechCarousel/TechCarousel';
import { extractTechnologiesFromRepos, getTechnologyInfo } from '../../utils/technologyMapping';

const Main = () => {
  const [currentActive, setcurrentActive] = useState('all');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    /**
     * Fetch repositories from the GitHub API and update component state.
     * Uses an AbortController to cancel the request on unmount and guards
     * against state updates when the component is no longer mounted.
     * @returns {Promise<void>} Resolves when loading completes.
     */
    async function loadRepos() {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(
          'https://api.github.com/users/Soufiane-64/repos?sort=updated&per_page=100',
          {
            headers: {
              Accept: 'application/vnd.github+json'
            },
            signal: controller.signal
          }
        );
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setRepos(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setError('Failed to load repositories.');
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

  // Extract technologies from GitHub repositories
  const technologies = useMemo(() => {
    if (repos.length === 0) return [];

    const techNames = extractTechnologiesFromRepos(repos);
    return techNames.map(techName => getTechnologyInfo(techName));
  }, [repos]);

  return (
    <>
      <TechCarousel
        technologies={technologies}
        isLoading={isLoading}
        error={error}
      />
      <main className="flex">
        <section className="flex left-section">
          <button
            onClick={() => {
              setcurrentActive('all');
            }}
            className={currentActive === 'all' ? 'active' : null}
          >
            all projects
          </button>
          <button
            onClick={() => {
              setcurrentActive('css');
            }}
            className={currentActive === 'css' ? 'active' : null}
          >
            HTML & CSS
          </button>
          <button
            onClick={() => {
              setcurrentActive('js');
            }}
            className={currentActive === 'js' ? 'active' : null}
          >
            JavaScript
          </button>
          <button
            onClick={() => {
              setcurrentActive('react');
            }}
            className={currentActive === 'react' ? 'active' : null}
          >
            React
          </button>
          <button
            onClick={() => {
              setcurrentActive('php');
            }}
            className={currentActive === 'php' ? 'active' : null}
          >
            PHP
          </button>
          <button
            onClick={() => {
              setcurrentActive('python');
            }}
            className={currentActive === 'python' ? 'active' : null}
          >
            Python
          </button>
          <button
            onClick={() => {
              setcurrentActive('java');
            }}
            className={currentActive === 'java' ? 'active' : null}
          >
            Java
          </button>
        </section>
        <section className="flex right-section">
          {isLoading && (
            [...Array(6)].map((_, index) => (
              <article key={`skeleton-${index}`} className="card">
                <div
                  className="image-container"
                  style={{ width: '266px', height: '200px', overflow: 'hidden' }}
                >
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
                    src={`./${(index % 5) + 1}.jpg`}
                    alt="loading"
                  />
                </div>
                <div style={{ width: '266px' }} className="box">
                  <h1 className="title">Loading...</h1>
                  <p className="sub-title">Fetching repositories</p>
                  <div className="card-footer flex space-between">
                    <div className="icon-group flex">
                      <i className="fa-solid fa-link icon" />
                      <i className="fa-brands fa-github icon" />
                    </div>
                    <span className="more-link flex">more<i style={{ alignSelf: 'end' }} className="fa-solid fa-arrow-right icon" /></span>
                  </div>
                </div>
              </article>
            ))
          )}

          {!isLoading && error && (
            <article className="card" style={{ padding: '1rem' }}>
              <div className="box" style={{ width: '266px' }}>
                <h1 className="title">Error</h1>
                <p className="sub-title">{error}</p>
              </div>
            </article>
          )}

          {!isLoading && !error && projectsToRender.map((repo, index) => {
            const imgIndex = (index % 5) + 1;
            const homepage = repo.homepage && repo.homepage.trim().length > 0 ? repo.homepage : null;
            const repoUrl = repo.html_url;
            const description = repo.description || 'No description provided.';
            const title = repo.name;
            return (
              <article key={repo.id} className="card">
                <div
                  className="image-container"
                  style={{ width: '266px', height: '200px', overflow: 'hidden' }}
                >
                  <img
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    src={`./${imgIndex}.jpg`}
                    alt={title}
                  />
                </div>
                <div style={{ width: '266px' }} className="box">
                  <h1 className="title">{title}</h1>
                  <p className="sub-title">{description}</p>

                  <div className="card-footer flex space-between">
                    <div className="icon-group flex">
                      {homepage ? (
                        <a href={homepage} target="_blank" rel="noreferrer" title="Live site">
                          <i className="fa-solid fa-link icon" />
                        </a>
                      ) : (
                        <i className="fa-solid fa-link icon" title="Live site" />
                      )}
                      <a href={repoUrl} target="_blank" rel="noreferrer" title="GitHub">
                        <i className="fa-brands fa-github icon" />
                      </a>
                    </div>

                    <a className="more-link flex" href={repoUrl} target="_blank" rel="noreferrer">
                      more
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
