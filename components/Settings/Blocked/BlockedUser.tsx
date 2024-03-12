'use client';
import ProfileImage from '@/components/UI/User/ProfileImage';
import classes from './BlockedUser.module.scss';
import { useState } from 'react';
import Setting from '@/components/UI/Settings/Setting';
import { unBlockUser } from '@/lib/actions/user/blockUser';
import ModalBox from '@/components/UI/ModalBox';

interface BlockedUserProps {
	user: {
		id: string;
		image: string;
		imageType: string;
		name: string;
	};
}

const BlockedUser: React.FC<BlockedUserProps> = (props) => {
	const [isModal, setIsModal] = useState(false);

	const { user } = props;

	const unBlockHandler = async () => {
		await unBlockUser(user.id);
		setIsModal(false);
	};

	return (
		<div className={classes.box}>
			<div className={classes.user}>
				<ProfileImage
					image={user.image}
					imageType={user.imageType}
					name={user.name}
				/>
				<span>{user.name}</span>
			</div>
			<button onClick={() => setIsModal(true)}>Unblock</button>

			{isModal && (
				<ModalBox onClose={() => setIsModal(false)}>
					<div className={classes.note}>
						<span>Unblock {user.name}?</span>
						<p>
							{user.name} will now be able to see your posts, follow and message
							you on Instagram. They won&apos;t be notified that you unblocked
							them.
						</p>
					</div>
					<ul>
						<Setting red onClick={unBlockHandler}>
							Unblock
						</Setting>
						<Setting onClick={() => setIsModal(false)}>Cancel</Setting>
					</ul>
				</ModalBox>
			)}
		</div>
	);
};

export default BlockedUser;
