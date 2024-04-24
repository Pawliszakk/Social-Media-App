'use client';
import { useState } from 'react';
import classes from './Story.module.scss';
import Image from 'next/image';
import ProfileImage from '../UI/User/ProfileImage';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { transformPostDate } from '@/lib/helpers/transformPostDate';
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

	const likeHandler = () => {
		if (isUserLikingStory) {
			setIsUserLikingStory(false);
		} else {
			setIsUserLikingStory(true);
		}
	};

	const { author } = story;

	const transformedDate = transformPostDate(+story.date);
	return (
		<div className={classes.story}>
			<div className={classes.actions}>
				<div className={classes.author}>
					<Link href={`/profile/${author.id}`}>
						<ProfileImage
							image={author.image}
							imageType={author.imageType}
							name={author.name}
						/>
					</Link>
					<Link href={`/profile/${author.id}`}>{author.name}</Link>
					<span>{transformedDate}</span>
				</div>
			</div>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${story.image}`}
				alt="User story"
				width={300}
				height={500}
			/>
			<div className={classes.bottom}>
				<div className={classes.input}>
					<input type="text" placeholder={`Reply to ${author.name}...`} />
				</div>
				<div
					className={`${classes.like} ${
						isUserLikingStory ? classes.liked : null
					}`}
					onClick={likeHandler}
				>
					{isUserLikingStory ? <FaHeart /> : <FaRegHeart />}
				</div>
			</div>
			<div className={classes.shadow}></div>
		</div>
	);
};

export default Story;
