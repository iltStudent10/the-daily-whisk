interface LoadingStateProps {
  message?: string
}

function LoadingState({ message = 'Loading recipes...' }: LoadingStateProps) {
  return <p className="status">{message}</p>
}

export default LoadingState