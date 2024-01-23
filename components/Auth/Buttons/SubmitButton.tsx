import Spinner from '@/components/UI/Spinner';
import classes from './SubmitButton.module.scss';

interface SubmitButtonProps {
	children: string;
	loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, loading }) => {
	return (
		<button className={classes.submit} type="submit" disabled={!loading}>
			{!loading ? <Spinner /> : children}
		</button>
	);
};

export default SubmitButton;
