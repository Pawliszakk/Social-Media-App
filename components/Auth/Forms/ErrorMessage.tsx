import classes from './ErrorMessage.module.scss';

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	return <p className={classes.message}>{message}</p>;
};

export default ErrorMessage;
