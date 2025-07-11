import { Component, type ErrorInfo, type ReactNode } from "react";
import ErrorMessage from "../../shared/ui/errorMessage";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <ErrorMessage error="Something went wrong!" />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;