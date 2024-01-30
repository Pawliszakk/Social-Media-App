'use client';

import classes from './CreatePost.module.scss';
import Image from 'next/image';
import ImagePicker from './ImagePicker';

interface CreatePostProps {
	image: string;
	name: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name }) => {
	return (
		<div className={classes.post}>
			<header>
				<h1>Create new post</h1>
			</header>

			<div className={classes.user}>
				<Image
					src={image}
					width={100}
					height={100}
					alt={`Profile image of ${name}`}
				/>
				<span>{name}</span>
			</div>

			<div className={classes.form}>
				<form>
					<textarea name="" id="" placeholder="Write a caption..."></textarea>
					<ImagePicker label="Choose image for your post" name="image" />
				</form>
			</div>
		</div>
	);
};

export default CreatePost;
