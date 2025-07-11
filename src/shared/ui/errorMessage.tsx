interface ErrorMessageProps {
  error: string
}

const ErrorMessage = ({error}: ErrorMessageProps) => {
  return (
    <h1 className="text-red-500 text-center">{error}</h1>
  )
}

export default ErrorMessage