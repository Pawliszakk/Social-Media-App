'use client';

import classes from './EditPost.module.scss';
import Image from 'next/image';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { useState } from 'react';
import { editPost } from '@/lib/actions/post/editPost';
import Spinner from '@/components/UI/Spinner';
interface EditPostProps {
	onClose: () => void;
	authorName: string;
	postId: string;
	images: string | string[];
	userImage: string;
	userImageType: string;
}

const EditPost: React.FC<EditPostProps> = (props) => {
	const [description, setDescription] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const handlePostEdit = async () => {
		setIsLoading(true);
		await editPost(props.postId, description);
		props.onClose();
	};

	return (
		<div className={classes.edit}>
			<header>
				<button className={classes.cancel} onClick={props.onClose}>
					Cancel
				</button>
				<span>Edit Info</span>
				{isLoading ? (
					<Spinner />
				) : (
					<button onClick={handlePostEdit} className={classes.done}>
						Done
					</button>
				)}
			</header>
			<div className={classes.content}>
				<div className={classes.images}>
					<Image
						src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.images}`}
						width={600}
						height={600}
						alt={`Post of ${props.authorName} user`}
					/>
				</div>
				<div className={classes.panel}>
					<div className={classes.author}>
						<ProfileImage
							image={props.userImage}
							imageType={props.userImageType}
							name={props.authorName}
						/>
						<span>{props.authorName}</span>
					</div>

					<div className={classes.textarea}>
						{' '}
						<textarea
							name="description"
							id="description"
							placeholder="Write a caption..."
							value={description}
							onChange={handleDescriptionChange}
						></textarea>
						<span>{description.length} / 2,200</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPost;
