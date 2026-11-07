import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Application error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-screen">
          <h1>MISSION INTERRUPTED</h1>
          <p>Something went wrong. Please reload the page.</p>
          <button onClick={() => window.location.reload()}>
            RELOAD PAGE
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;