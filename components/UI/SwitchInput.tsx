import classes from './SwitchInput.module.scss';

interface SwitchInputProps {
	label: string;
	name: string;
}

const SwitchInput: React.FC<SwitchInputProps> = ({ name, label }) => {
	return (
		<label htmlFor={name} className={classes.label}>
			{label}
			<div className={classes.switch}>
				{' '}
				<input type="checkbox" name={name} id={name} />
				<span></span>
			</div>
		</label>
	);
};

export default SwitchInput;
