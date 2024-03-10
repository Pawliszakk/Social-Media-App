'use client';
import classes from './Appearance.module.scss';
import { appearanceChange } from '@/lib/actions/user/settings/apeearanceChange';
import { useEffect, useState } from 'react';
import styles from '@/components/UI/SwitchInput.module.scss';

interface AppearanceProps {
	isDark: boolean;
}

const Appearance: React.FC<AppearanceProps> = (props) => {
	const [isDark, setIsDark] = useState(props.isDark);

	const handleSwitchToggle = (e: any) => {
		const isChecked = e.target.checked;

		document.body.setAttribute('data-theme', isChecked ? 'dark' : 'light');

		setIsDark(isChecked);
	};
	useEffect(() => {
		const changeAppearance = setTimeout(() => {
			appearanceChange(isDark ? 'dark' : 'light');
		}, 500);

		return () => clearTimeout(changeAppearance);
	}, [isDark]);

	return (
		<div className={classes.box}>
			<span>Dark theme</span>
			<label htmlFor="theme" className={styles.label}>
				<div className={styles.switch}>
					<input
						type="checkbox"
						name="theme"
						id="theme"
						onChange={handleSwitchToggle}
						checked={isDark}
					/>
					<span></span>
				</div>
			</label>
		</div>
	);
};

export default Appearance;
