"use client";

import type { ReactNode } from "react";
import { Component } from "react";

type CanvasErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type CanvasErrorBoundaryState = {
  hasError: boolean;
};

export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  state: CanvasErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("3D experience failed to render", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}
