'use client';

import Image from 'next/image';
import classes from './PostImages.module.scss';
import { useEffect, useState } from 'react';
import LikeAnimation from './LikeAnimation';
interface PostImagesProps {
	images: string | string[];
	author: string;
	isUserLikingPost: boolean;
	likePost: () => void;
}

const PostImages: React.FC<PostImagesProps> = (props) => {
	const [isLikeComponent, setIsLikeComponent] = useState(false);

	const handleDoubleClick = () => {
		setIsLikeComponent(true);
		if (props.isUserLikingPost) {
			return;
		} else {
			props.likePost();
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setIsLikeComponent(false);
		}, 1000);
	}, [isLikeComponent]);

	return (
		<div className={classes.images} onDoubleClick={handleDoubleClick}>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.images}`}
				width={600}
				height={600}
				alt={`Post of ${props.author} user`}
			/>
			{isLikeComponent && <LikeAnimation />}
		</div>
	);
};

export default PostImages;
