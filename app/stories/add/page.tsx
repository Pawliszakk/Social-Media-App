import AddStory from '@/components/addStory/AddStory';
import { getUserData } from '@/lib/actions/utils/getUserData';

const AddStoryPage = async () => {
	const { session, user } = await getUserData('image imageType name');
	return (
		<AddStory name={user.name} image={user.image} imageType={user.imageType} />
	);
};

export default AddStoryPage;
