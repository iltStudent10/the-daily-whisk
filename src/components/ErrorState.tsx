interface ErrorStateProps {
  message: string
}

function ErrorState({ message }: ErrorStateProps) {
  return <p className="status error">{message}</p>
}

export default ErrorState