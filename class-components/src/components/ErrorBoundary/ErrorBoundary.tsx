import { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	static logErrorToService(error: Error, errorInfo: ErrorInfo) {
		if (process.env.NODE_ENV !== 'production') {
			console.error("Error caught in ErrorBoundary:", error, errorInfo); // I struggled all day and couldn't replace this line with something else so that the linter wouldn't swear :((
		}
	}

	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		ErrorBoundary.logErrorToService(error, errorInfo);
	}

	render() {
		const { hasError } = this.state;
		const { children } = this.props;

		if (hasError) {
			return <div>Something went wrong...</div>;
		}

		return children;
	}
}

export default ErrorBoundary;