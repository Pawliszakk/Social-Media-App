import { getStoriesByProfileId } from '@/lib/actions/stories/getStoriesByUserId';

const StoriesPage = async ({ params }: { params: { userId: string } }) => {
	const { userId } = params;

	const stories = await getStoriesByProfileId(userId);
console.log(stories);
	return (
		<div>
			{userId} liczba stories {stories ? stories.length : 0}
		</div>
	);
};

export default StoriesPage;
