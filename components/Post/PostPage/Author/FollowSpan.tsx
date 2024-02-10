'use client';

import { useState } from 'react';
import classes from './FollowSpan.module.scss';

interface FollowSpanProps {
	isUserFollowingAuthor: boolean;
	follow: () => void;
	unFollow: () => void;
}

const FollowSpan: React.FC<FollowSpanProps> = (props) => {
	const [isFollowing, setIsFollowing] = useState(props.isUserFollowingAuthor);

	const spanClickHandler = () => {
		if (isFollowing) {
			props.unFollow();
			setIsFollowing(false);
		} else {
			props.follow();
			setIsFollowing(true);
		}
	};
	return (
		<span onClick={spanClickHandler} className={classes.followSpan}>
			{isFollowing ? 'Following' : 'Follow'}
		</span>
	);
};

export default FollowSpan;
