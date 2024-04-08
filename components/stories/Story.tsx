'use client';
import { useState } from 'react';
import classes from './Story.module.scss';
import Image from 'next/image';
import ProfileImage from '../UI/User/ProfileImage';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
interface StoryProps {
	story: {
		id: string;
		author: {
			id: string;
			image: string;
			imageType: string;
			name: string;
		};
		image: string;
		date: string;
	};
}
//Info czy user likuje już to stories
//Na górze w nadrzędnym komponencie pasek które to jest story
//Zatrzymanie story
//Czas po którym story się zmienia, kończy
//Jak kończy to redirect na homepage

const Story: React.FC<StoryProps> = ({ story }) => {
	const [isUserLikingStory, setIsUserLikingStory] = useState(false);

	const { author } = story;

	return (
		<div className={classes.story}>
			<div className={classes.actions}>
				<div className={classes.author}>
					<ProfileImage
						image={author.image}
						imageType={author.imageType}
						name={author.name}
					/>
					<Link href={`/profile/${author.id}`}>{author.name}</Link>
				</div>
			</div>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${story.image}`}
				alt="User story"
				width={300}
				height={500}
			/>
			<div className={classes.bottom}>
				<div className={classes.like}>
					<FaRegHeart />
				</div>
			</div>
		</div>
	);
};

export default Story;
