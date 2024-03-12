'use client';

import { useState } from 'react';
import SettingsButton from '../UI/Settings/SettingsButton';
import Setting from '../UI/Settings/Setting';
import AccountAbout from '../UI/Settings/AccountAbout';
import {
	ABOUT,
	ADD_CLOSE_FRIEND,
	BLOCK,
	REMOVE_CLOSE_FRIEND,
	UNBLOCK,
} from '@/lib/constants/profileActions';
import { blockUser, unBlockUser } from '@/lib/actions/user/blockUser';
import {
	addCloseFriend,
	removeCloseFriend,
} from '@/lib/actions/user/addCloseFriend';
import ModalBox from '../UI/ModalBox';
interface ProfileSettingsProps {
	profileId: string;
	userId: string;
	isBlocked: boolean;
	isCloseFriend: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = (props) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);

	const { userId, profileId } = props;

	const handleClick = async (action: string) => {
		switch (action) {
			case ABOUT:
				setIsAboutComponent(true);
				break;
			case BLOCK:
				await blockUser(profileId);
				setIsSettings(false);
				location.reload();
				break;
			case UNBLOCK:
				await unBlockUser(profileId);
				setIsSettings(false);
				location.reload();
				break;
			case ADD_CLOSE_FRIEND:
				await addCloseFriend(profileId);
				setIsSettings(false);
				break;
			case REMOVE_CLOSE_FRIEND:
				await removeCloseFriend(profileId);
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
				<ModalBox onClose={() => setIsSettings(false)}>
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

							{props.isCloseFriend ? (
								<Setting onClick={() => handleClick(REMOVE_CLOSE_FRIEND)}>
									Remove from close friends
								</Setting>
							) : (
								<Setting onClick={() => handleClick(ADD_CLOSE_FRIEND)}>
									Add to close friends
								</Setting>
							)}
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
				</ModalBox>
			)}
		</>
	);
};

export default ProfileSettings;
