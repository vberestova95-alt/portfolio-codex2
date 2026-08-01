import React from 'react';
import { RuntimeErrorPage } from '../pages/ErrorPage.jsx';

export class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <RuntimeErrorPage />;
    }

    return this.props.children;
  }
}
