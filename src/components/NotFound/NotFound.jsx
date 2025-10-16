import { useEffect } from 'react';

function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '404 - Page Not Found';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', background: '#09334f' }}>
      <iframe
        title="404 Not Found"
        src="/404/index.html"
        style={{ border: 'none', width: '100%', height: '100%' }}
        sandbox="allow-scripts allow-same-origin"
        allow="fullscreen; autoplay; clipboard-read; clipboard-write"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default NotFound;


