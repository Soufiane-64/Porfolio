import { useState, useCallback } from 'react';

/**
 * Language → gradient colour map for the placeholder.
 */
const LANG_COLORS = {
  javascript: ['#f7df1e', '#e8c700'],
  typescript: ['#3178c6', '#235a9e'],
  python: ['#3776ab', '#ffd43b'],
  php: ['#777bb4', '#4f5b93'],
  css: ['#1572b6', '#33a9dc'],
  html: ['#e34f26', '#f06529'],
  java: ['#b07219', '#e76f00'],
  ruby: ['#cc342d', '#a91401'],
  go: ['#00add8', '#007d9c'],
  rust: ['#dea584', '#b7410e'],
  default: ['#6366f1', '#4338ca']
};

/**
 * Builds an ordered list of image URLs to attempt for a given repo.
 * Kept deliberately short to avoid flooding the network with 404s.
 */
function buildCandidates(repo, index) {
  const owner = repo.owner?.login || 'Soufiane-64';
  const name = repo.name;
  const fullName = repo.full_name || `${owner}/${name}`;
  const cacheKey = repo.pushed_at || repo.updated_at || String(repo.id || index);

  return [
    // 1 – GitHub's OpenGraph social-preview (works for all public repos)
    `https://opengraph.githubassets.com/${encodeURIComponent(cacheKey)}/${fullName}`,
    // 2 – Explicit social image uploaded by the repo owner (if any)
    `https://repository-images.githubusercontent.com/${repo.id}`,
    // 3 – Main-branch screenshot (convention some devs follow)
    `https://raw.githubusercontent.com/${owner}/${name}/main/screenshot.png`,
    // 4 – Master-branch screenshot
    `https://raw.githubusercontent.com/${owner}/${name}/master/screenshot.png`
  ];
}

/**
 * <RepoImage /> renders a repo card image with a cascading fallback chain.
 * If every candidate fails it shows a styled gradient placeholder instead
 * of a broken-image icon.
 */
const RepoImage = ({ repo, index }) => {
  const candidates = buildCandidates(repo, index);
  const [candidateIdx, setCandidateIdx] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const handleError = useCallback(() => {
    const next = candidateIdx + 1;
    if (next < candidates.length) {
      setCandidateIdx(next);
    } else {
      setAllFailed(true);
    }
  }, [candidateIdx, candidates.length]);

  if (allFailed) {
    const lang = (repo.language || '').toLowerCase();
    const [c1, c2] = LANG_COLORS[lang] || LANG_COLORS.default;
    return (
      <div
        className="repo-image-placeholder"
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${c1}22, ${c2}44)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: c1,
          userSelect: 'none'
        }}
      >
        <i className="fa-brands fa-github" style={{ fontSize: '2.5rem', opacity: 0.5 }} />
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            opacity: 0.7,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {repo.language || 'Repository'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={candidates[candidateIdx]}
      alt={repo.name}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'left top'
      }}
      onError={handleError}
    />
  );
};

export default RepoImage;
