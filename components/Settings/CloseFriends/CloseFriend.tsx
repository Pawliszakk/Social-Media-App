'use client';

import { useState } from 'react';
import ProfileImage from '@/components/UI/User/ProfileImage';
import classes from './CloseFriend.module.scss';
import {
	addCloseFriend,
	removeCloseFriend,
} from '@/lib/actions/user/addCloseFriend';
import Spinner from '@/components/UI/Spinner';

interface CloseFriendProps {
	user: {
		image: string;
		imageType: string;
		name: string;
		id: string;
		isCloseFriend: boolean;
	};
}

const CloseFriend: React.FC<CloseFriendProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const { user } = props;
	const closeFriendsHandler = async () => {
		setIsLoading(true);

		try {
			if (user.isCloseFriend) {
				await removeCloseFriend(user.id);
			} else {
				await addCloseFriend(user.id);
			}
		} catch (e) {
			setIsLoading(false);
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	return (
		<div
			className={`${classes.box} ${isLoading ? classes.loading : null}`}
			onClick={closeFriendsHandler}
		>
			<div className={classes.user}>
				<ProfileImage
					name={user.name}
					image={user.image}
					imageType={user.imageType}
				/>
				<span>{user.name}</span>
			</div>
			<div>
				<input
					type="checkbox"
					checked={user.isCloseFriend}
					onChange={() => {}}
				/>
			</div>
			{isLoading && <Spinner className={classes.spinner} />}
		</div>
	);
};

export default CloseFriend;
