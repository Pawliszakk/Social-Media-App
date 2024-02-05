'use client';

import Image from 'next/image';
import classes from './PostImages.module.scss';
import { useState } from 'react';
import LikeAnimation from '../Likes/LikeAnimation';
interface PostImagesProps {
	images: string | string[];
	authorName: string;
	isUserLikingPost: boolean;
	likePost: () => void;
}

const PostImages: React.FC<PostImagesProps> = (props) => {
	const [isLikeAnimation, setIsLikeAnimation] = useState(false);
	const [likeTimeout, setLikeTimeout] = useState<NodeJS.Timeout | null>(null);

	const handleDoubleClick = () => {
		setIsLikeAnimation(true);

		if (!props.isUserLikingPost) {
			props.likePost();
		}

		if (likeTimeout !== null) {
			clearTimeout(likeTimeout);
		}

		const newTimeout = setTimeout(() => {
			setIsLikeAnimation(false);
		}, 1000);

		setLikeTimeout(newTimeout);
	};

	return (
		<div className={classes.images} onDoubleClick={handleDoubleClick}>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.images}`}
				width={600}
				height={600}
				alt={`Post of ${props.authorName} user`}
			/>
			{isLikeAnimation && <LikeAnimation />}
		</div>
	);
};

export default PostImages;
