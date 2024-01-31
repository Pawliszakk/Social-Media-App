import classes from './CreatePost.module.scss';
import Image from 'next/image';
import ImagePicker from './ImagePicker';
import { createPost } from '@/lib/actions/post/post';

interface CreatePostProps {
	image: string;
	name: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name }) => {
	async function sharePost(formData: any) {
		'use server';
		//DODAĆ COMMENTING
		const description = formData.get('description');

		const image = formData.get('image');

		createPost(description, image);
	}

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

			<form action={sharePost}>
				<textarea
					name="description"
					id="description"
					placeholder="Write a caption..."
				></textarea>
				<ImagePicker label="Choose image for your post" name="image" />
			</form>
		</div>
	);
};

export default CreatePost;
