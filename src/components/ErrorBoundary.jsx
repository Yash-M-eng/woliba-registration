import { Component } from 'react';

const fallbackStyles = {
  app: 'mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center',
  page: 'w-full max-w-[430px] rounded-[4px] border border-red-100 bg-white px-5 py-6 text-center shadow-[0_8px_30px_rgba(26,43,76,0.08)]',
  field: 'mb-[clamp(12px,2.02vh,20px)] rounded-[2px] border border-red-100 bg-red-50 px-3 py-2',
  inline: 'rounded-[2px] border border-red-100 bg-red-50 px-3 py-2',
};

const fallbackCopy = {
  app: 'Something went wrong. Please refresh and try again.',
  page: 'This section could not load. Please try again.',
  field: 'This field could not load.',
  inline: 'This part could not load.',
};

const ErrorFallback = ({ variant, onReset }) => (
  <div className={fallbackStyles[variant]} role="alert">
    <p className="text-[11px] font-medium text-red-600">{fallbackCopy[variant]}</p>
    {variant !== 'field' && (
      <button
        type="button"
        onClick={onReset}
        className="mt-3 h-[30px] rounded-[2px] bg-primary px-4 text-[10px] font-medium text-white transition hover:bg-primaryHover"
      >
        Try again
      </button>
    )}
  </div>
);

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: Boolean(error) };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps) {
    const { resetKeys = [] } = this.props;
    if (!this.state.hasError || resetKeys === prevProps.resetKeys) return;

    const didReset = resetKeys.some((key, index) => key !== prevProps.resetKeys?.[index]);
    if (didReset) {
      this.setState({ hasError: false });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { children, variant = 'page' } = this.props;

    if (this.state.hasError) {
      return <ErrorFallback variant={variant} onReset={this.handleReset} />;
    }

    return children;
  }
}

export const FieldBoundary = ({ children, variant = 'field' }) => (
  <ErrorBoundary variant={variant}>
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary;
