import { Component } from 'react';

/**
 * Generic Error Boundary — catches render errors in child components
 * and displays a fallback UI instead of crashing the whole app.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--subtitle, #888)',
          background: 'var(--secondary, #1a1a1a)',
          borderRadius: '0.5rem',
          margin: '1rem 0',
        }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2rem', marginBottom: '0.5rem' }} />
          <p>Something went wrong loading this section.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', cursor: 'pointer', border: '1px solid var(--border)', borderRadius: '4px', background: 'transparent', color: 'inherit' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
