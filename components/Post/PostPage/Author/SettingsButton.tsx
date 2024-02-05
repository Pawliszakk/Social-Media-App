'use client';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import PostSettings from './PostSettings';
import classes from './SettingsButton.module.scss';

const SettingsButton = () => {
	const [isSettings, setIsSettings] = useState(false);

	return (
		<>
			<button className={classes.button} onClick={() => setIsSettings(true)}>
				<BsThreeDots />
			</button>
			{isSettings && (
				<PostSettings closeSettings={() => setIsSettings(false)} />
			)}
		</>
	);
};

export default SettingsButton;
