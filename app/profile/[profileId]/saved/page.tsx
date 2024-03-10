import Posts from '@/components/Profile/Posts/Posts';
import { permanentRedirect } from 'next/navigation';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function ProfilePage({
	params,
}: {
	params: { profileId: string };
}) {
	const { session, user } = await getUserData('showLikes');

	const { profileId } = params;

	const isLoggedUserProfile = profileId === user.id;

	if (!isLoggedUserProfile) {
		permanentRedirect(`/profile/${profileId}`);
	}
	let savedPosts;
	let authorName;

	if (isLoggedUserProfile) {
		const { session, user } = await getUserData(
			'savedPosts name',
			'savedPosts'
		);
		savedPosts = user.savedPosts.reverse();
		authorName = user.name;
	}

	return (
		<Posts
			posts={savedPosts}
			authorName={authorName}
			userId={user.id}
			showLikes={user.showLikes}
		/>
	);
}
