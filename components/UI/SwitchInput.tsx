import { ChangeEvent, useEffect, useState } from 'react';
import classes from './SwitchInput.module.scss';

interface SwitchInputProps {
	label: string;
	name: string;
	onToggle?: (isChecked: boolean) => void;
	isChecked?: boolean;
}

const SwitchInput: React.FC<SwitchInputProps> = (props) => {
	const [isChecked, setIsChecked] = useState(props.isChecked ? true : false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIsChecked(e.target.checked);
		props.onToggle && props.onToggle(e.target.checked);
	};
	useEffect(() => {
		setIsChecked(props.isChecked || false);
	}, [props.isChecked]);
	return (
		<label htmlFor={props.name} className={classes.label}>
			{props.label}
			<div className={classes.switch}>
				<input
					type="checkbox"
					name={props.name}
					id={props.name}
					onChange={props.onToggle ? handleChange : undefined}
					defaultChecked={isChecked}
				/>
				<span></span>
			</div>
		</label>
	);
};

export default SwitchInput;
