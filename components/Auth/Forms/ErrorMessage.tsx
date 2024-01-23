interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	return <p style={{ color: 'tomato' }}>{message}</p>;
};

export default ErrorMessage;
