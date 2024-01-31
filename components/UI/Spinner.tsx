import classes from './Spinner.module.scss';

interface SpinnerProps {
	className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
	return (
		<div className={`${classes.spinner} ${className ? className : ''}`}></div>
	);
};

export default Spinner;
