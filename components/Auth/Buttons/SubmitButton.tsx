import classes from './SubmitButton.module.scss';

interface SubmitButtonProps {
	children: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
	return (
		<button className={classes.submit} type="submit">
			{children}
		</button>
	);
};

export default SubmitButton;
