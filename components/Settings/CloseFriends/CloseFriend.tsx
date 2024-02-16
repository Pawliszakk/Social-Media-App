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
	image: string;
	imageType: string;
	name: string;
	profileId: string;
	userId: string;
	isCloseFriend: boolean;
}

const CloseFriend: React.FC<CloseFriendProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);

	const closeFriendsHandler = async () => {
		setIsLoading(true);

		try {
			if (props.isCloseFriend) {
				await removeCloseFriend(props.userId, props.profileId);
			} else {
				await addCloseFriend(props.userId, props.profileId);
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
					name={props.name}
					image={props.image}
					imageType={props.imageType}
				/>
				<span>{props.name}</span>
			</div>
			<div>
				<input type="checkbox" checked={props.isCloseFriend} />
			</div>
			{isLoading && <Spinner className={classes.spinner} />}
		</div>
	);
};

export default CloseFriend;
