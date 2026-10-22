import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#F1ECE6]">
          <div className="max-w-md w-full bg-white border-2 border-red-200 rounded-3xl p-8 text-center space-y-4 shadow-elevated">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h2 className="font-heading font-extrabold text-xl text-[#2E2E2E]">
              Display Notice
            </h2>
            <p className="text-xs text-[#625f5c] leading-relaxed">
              We encountered a temporary rendering glitch. Click below to reload or return to the main studio home.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#7D4047] hover:bg-[#67333a] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#2E2E2E] text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home Page</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
