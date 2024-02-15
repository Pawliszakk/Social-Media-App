'use client';
import ProfileImage from '@/components/UI/User/ProfileImage';
import classes from './BlockedUser.module.scss';
import { useState } from 'react';
import SettingsBox from '@/components/UI/Settings/SettingsBox';
import Setting from '@/components/UI/Settings/Setting';
import { unBlockUser } from '@/lib/actions/user/blockUser';

interface BlockedUserProps {
	userId: string;
	profileId: string;
	image: string;
	imageType: string;
	name: string;
}

const BlockedUser: React.FC<BlockedUserProps> = (props) => {
	const [isModal, setIsModal] = useState(false);

	const unBlockHandler = async () => {
		await unBlockUser(props.userId, props.profileId);
		setIsModal(false);
	};

	return (
		<div className={classes.box}>
			<div className={classes.user}>
				<ProfileImage
					image={props.image}
					imageType={props.imageType}
					name={props.name}
				/>
				<span>{props.name}</span>
			</div>
			<button onClick={() => setIsModal(true)}>Unblock</button>

			{isModal && (
				<SettingsBox onClose={() => setIsModal(false)}>
					<div className={classes.note}>
						<span>Unblock {props.name}?</span>
						<p>
							{props.name} will now be able to see your posts, follow and
							message you on Instagram. They won&apos;t be notified that you
							unblocked them.
						</p>
					</div>
					<ul>
						<Setting red onClick={unBlockHandler}>
							Unblock
						</Setting>
						<Setting onClick={() => setIsModal(false)}>Cancel</Setting>
					</ul>
				</SettingsBox>
			)}
		</div>
	);
};

export default BlockedUser;
