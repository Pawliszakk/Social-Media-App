import classes from './FormCard.module.scss';

interface FormCardProps {
	children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ children }) => {
	return <div className={classes.card}>{children}</div>;
};

export default FormCard;
