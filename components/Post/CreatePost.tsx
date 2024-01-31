import classes from './CreatePost.module.scss';
import Image from 'next/image';
import ImagePicker from './ImagePicker';
import { createPost } from '@/lib/actions/post/post';
import SwitchInput from '../UI/SwitchInput';

interface CreatePostProps {
	image: string | null | undefined;
	name: string | null | undefined;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name }) => {
	async function sharePost(formData: any) {
		'use server';

		const description = formData.get('description');
		const image = formData.get('image');
		const commenting = formData.get('commenting');
		const hideLikesCount = formData.get('hideLikesCount');

		createPost(description, image, commenting, hideLikesCount);
	}

	return (
		<div className={classes.post}>
			<header>
				<h1>Create new post</h1>
			</header>

			<div className={classes.user}>
				<Image
					src={`${image}`}
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
				<SwitchInput name="commenting" label="Turn off comments" />
				<SwitchInput
					name="hideLikesCount"
					label="Hide like counts on this post"
				/>
				<ImagePicker label="Choose image for your post" name="image" />
			</form>
		</div>
	);
};

export default CreatePost;
