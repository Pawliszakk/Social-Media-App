'use client';

import { useState } from 'react';
import SettingsButton from '../UI/Settings/SettingsButton';
import SettingsBox from '../UI/Settings/SettingsBox';
import Setting from '../UI/Settings/Setting';
import AccountAbout from '../UI/Settings/AccountAbout';
import { ABOUT, BLOCK, UNBLOCK } from '@/lib/constants/profileActions';
import { blockUser, unBlockUser } from '@/lib/actions/user/blockUser';

interface ProfileSettingsProps {
	profileId: string;
	userId: string;
	isBlocked: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = (props) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);

	const handleClick = async (action: string) => {
		switch (action) {
			case ABOUT:
				setIsAboutComponent(true);
				break;
			case BLOCK:
				await blockUser(props.userId, props.profileId);
				setIsSettings(false);
				break;
			case UNBLOCK:
				await unBlockUser(props.userId, props.profileId);
				setIsSettings(false);
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
							{props.isBlocked ? (
								<Setting onClick={() => handleClick(UNBLOCK)} red>
									Unblock
								</Setting>
							) : (
								<Setting onClick={() => handleClick(BLOCK)} red>
									Block
								</Setting>
							)}

							<Setting onClick={() => console.log('test')}>
								Add to close friends list
							</Setting>
							<Setting onClick={() => handleClick(ABOUT)}>
								About this account
							</Setting>
							<Setting onClick={() => setIsSettings(false)}>Cancel</Setting>
						</ul>
					)}
					{isAboutComponent && (
						<AccountAbout
							userId={props.profileId}
							onClose={() => {
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
