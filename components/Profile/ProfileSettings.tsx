'use client';

import { useState } from 'react';
import SettingsButton from '../UI/Settings/SettingsButton';
import SettingsBox from '../UI/Settings/SettingsBox';
import Setting from '../UI/Settings/Setting';
import AccountAbout from '../UI/Settings/AccountAbout';

interface ProfileSettingsProps {
	profileId: string;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = (props) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);

	const handleClick = async (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>,
		action: string
	) => {
		e.stopPropagation();
		switch (action) {
			case 'about':
				setIsAboutComponent(true);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<SettingsButton onClick={() => setIsSettings(true)} />
			{isSettings && (
				<SettingsBox onClose={() => setIsSettings(false)}>
					{!isAboutComponent && (
						<ul>
							<Setting onClick={() => console.log('test')} red>
								Block
							</Setting>
							{/* WARUNEK */}
							<Setting onClick={() => console.log('test')} red>
								Unfollow
							</Setting>
							<Setting onClick={() => console.log('test')}>
								Add to close friends list
							</Setting>
							<Setting onClick={(e) => handleClick(e, 'about')}>
								About this account
							</Setting>
							<Setting onClick={() => setIsSettings(false)}>Cancel</Setting>
						</ul>
					)}
					{isAboutComponent && (
						<AccountAbout
							userId={props.profileId}
							onClose={(
								e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
							) => {
								e.stopPropagation();
								setIsAboutComponent(false);
								setIsSettings(false);
							}}
						/>
					)}
				</SettingsBox>
			)}
		</>
	);
};

export default ProfileSettings;
