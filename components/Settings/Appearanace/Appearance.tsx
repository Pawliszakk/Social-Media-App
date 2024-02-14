'use client';
import SwitchInput from '@/components/UI/SwitchInput';
import classes from './Appearance.module.scss';
import { appearanceChange } from '@/lib/actions/user/settings/apeearanceChange';

interface AppearanceProps {
	userId: string;
	isDark: boolean;
}

const Appearance: React.FC<AppearanceProps> = (props) => {
	const handleSwitchToggle = (isChecked: boolean) => {
		const theme = isChecked ? 'dark' : 'light';

		document.body.setAttribute('data-theme', theme);
		appearanceChange(theme, props.userId);
	};

	return (
		<div className={classes.box}>
			<span>Dark theme</span>
			<SwitchInput
				name="theme"
				label=""
				onToggle={handleSwitchToggle}
				isChecked={props.isDark}
			/>
		</div>
	);
};

export default Appearance;
