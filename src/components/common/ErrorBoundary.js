import React from 'react';
import { Container, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 text-center">
          <div className="py-5">
            <h1 className="display-1 text-muted">😢</h1>
            <h2 className="mb-3">Something went wrong</h2>
            <p className="text-muted mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button className="btn-organic" onClick={this.handleReload}>
              Reload Page
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;