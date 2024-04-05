'use client';
import { useFormState } from 'react-dom';
import ProfileImage from '../UI/User/ProfileImage';
import classes from './AddStory.module.scss';
import { createStory } from '@/lib/actions/stories/createStory';
import ImagePicker from '../Post/Create/ImagePicker';

interface CreateStoryProps {
	imageType: string | null | undefined;
	image: string | null | undefined;
	name: string | null | undefined;
}

const AddStory: React.FC<CreateStoryProps> = ({ imageType, image, name }) => {
	const [state, formAction] = useFormState(createStory, { message: '' });

	return (
		<div className={classes.createStory}>
			<header>
				<h1>Create new story</h1>
			</header>

			<div className={classes.user}>
				<ProfileImage image={image} name={name} imageType={imageType} />
				<span>{name}</span>
			</div>

			<form action={formAction}>
				<ImagePicker name="image" />
				{state!.message && <p>{state!.message}</p>}
			</form>
		</div>
	);
};

export default AddStory;
