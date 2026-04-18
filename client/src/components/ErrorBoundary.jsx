import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an application error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 flex items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-primary mb-3">Recovery Mode</p>
          <h1 className="text-3xl font-black tracking-tight mb-3">Something went wrong</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            The app hit an unexpected error. Your session is still here, and you can retry without reloading the entire site.
          </p>
          {this.state.error?.message && (
            <div className="rounded-2xl bg-slate-100 dark:bg-slate-800/70 px-4 py-3 text-xs text-slate-600 dark:text-slate-300 mb-6">
              {this.state.error.message}
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-2xl border border-slate-300 dark:border-slate-700 px-5 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
