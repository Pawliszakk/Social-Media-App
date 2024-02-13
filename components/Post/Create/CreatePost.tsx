'use client';

import classes from './CreatePost.module.scss';
import ImagePicker from './ImagePicker';
import { useFormState } from 'react-dom';
import { createPost } from '@/lib/actions/post/createPost';
import SwitchInput from '@/components/UI/SwitchInput';
import ProfileImage from '@/components/UI/User/ProfileImage';

interface CreatePostProps {
	imageType: string | null | undefined;
	image: string | null | undefined;
	name: string | null | undefined;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, imageType }) => {
	const [state, formAction] = useFormState(createPost, { message: '' });

	return (
		<div className={classes.createPost}>
			<header>
				<h1>Create new post</h1>
			</header>

			<div className={classes.user}>
				<ProfileImage image={image} name={name} imageType={imageType} />
				<span>{name}</span>
			</div>

			<form action={formAction}>
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
				<ImagePicker name="image" />
				{state!.message && <p>{state!.message}</p>}
			</form>
		</div>
	);
};

export default CreatePost;
