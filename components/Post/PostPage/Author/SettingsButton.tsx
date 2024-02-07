import { BsThreeDots } from 'react-icons/bs';
import classes from './SettingsButton.module.scss';



interface SettingsButtonProps {
	onClick: () => void;
	className?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
	onClick,
	className,
}) => {
	return (
		<button
			className={`${classes.button} ${className ? className : ''}`}
			onClick={onClick}
		>
			<BsThreeDots />
		</button>
	);
};

export default SettingsButton;
