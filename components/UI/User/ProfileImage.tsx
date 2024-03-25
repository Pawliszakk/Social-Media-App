'use client';

import Image from 'next/image';
import classes from './ProfileImage.module.scss';
import { Suspense, useState } from 'react';
import Link from 'next/link';
import { getSnippetUserData } from '@/lib/actions/user/get/getSnippetUserData';
import ProfileSnippet from '@/components/Profile/Snippet/ProfileSnippet';
interface ProfileImageProps {
	image: string | null | undefined;
	imageType: string | null | undefined;
	name: string | null | undefined;
	userId?: string;
	profile?: boolean;
	profileId?: string;
	isUserFollowingProfile?: boolean;
	isUserAuthor?: boolean;
	snippet?: boolean;
	onClick?: () => void;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
	const [isHover, setIsHover] = useState(false);
	const [fetchedUser, setFetchedUser] = useState<any>(null);
	const handleMouseEnter = async () => {
		if (props.snippet) {
			setIsHover(true);
			try {
				const userData = await getSnippetUserData(`${props.profileId}`);
				setFetchedUser(userData);
			} catch (e) {
				setIsHover(false);
			}
		} else {
			return;
		}
	};
	const handleMouseLeave = () => setIsHover(false);
	let size = 50;
	if (props.profile) {
		size = 200;
	}

	return (
		<div
			className={classes.box}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{props.profileId ? (
				<Link href={`/profile/${props.profileId}`}>
					<Image
						className={classes.image}
						src={
							props.imageType === 'provider'
								? `${props.image}`
								: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.image}`
						}
						width={size}
						height={size}
						alt={`${props.name} Profile picture`}
					/>
				</Link>
			) : (
				<Image
					className={classes.image}
					src={
						props.imageType === 'provider'
							? `${props.image}`
							: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.image}`
					}
					width={size}
					height={size}
					alt={`${props.name} Profile picture`}
				/>
			)}
			{isHover && fetchedUser && (
				<Suspense fallback={<p>Loading</p>}>
					<ProfileSnippet
						userId={`${props.userId}`}
						user={fetchedUser}
						profileId={props.profileId}
						isUserFollowingProfile={props.isUserFollowingProfile}
						isUserAuthor={props.isUserAuthor}
					/>
				</Suspense>
			)}
		</div>
	);
};

export default ProfileImage;
