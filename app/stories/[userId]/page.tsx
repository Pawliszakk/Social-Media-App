import Story from '@/components/stories/Story';
import { getStoriesByProfileId } from '@/lib/actions/stories/getStoriesByUserId';

const StoriesPage = async ({ params }: { params: { userId: string } }) => {
	const { userId } = params;

	const stories = await getStoriesByProfileId(userId);
	return <div>{stories && <Story story={stories} />}</div>;
};

export default StoriesPage;
