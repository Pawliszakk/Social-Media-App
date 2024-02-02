'use client';
import Image from 'next/image';

import classes from './CreatePost.module.scss';
import ImagePicker from './ImagePicker';
import { useFormState } from 'react-dom';
import { createPost } from '@/lib/actions/post/createPost';
import SwitchInput from '@/components/UI/SwitchInput';

interface CreatePostProps {
	image: string | null | undefined;
	name: string | null | undefined;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name }) => {
	const [state, formAction] = useFormState(createPost, { message: '' });

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
