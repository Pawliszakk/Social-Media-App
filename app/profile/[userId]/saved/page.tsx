import { getSessionData } from '@/lib/actions/utils/getSessionData';
import Posts from '@/components/Profile/Posts/Posts';
import { permanentRedirect } from 'next/navigation';
import { getSavedPosts } from '@/lib/actions/user/getSavedPosts';

export default async function ProfilePage({
	params,
}: {
	params: { userId: string };
}) {
	const { session, user } = await getSessionData();

	const { userId } = params;

	const isLoggedUserProfile = userId === user?.userId;

	if (!isLoggedUserProfile) {
		permanentRedirect(`/profile/${userId}`);
	}
	let savedPosts;
	let authorName;
	if (isLoggedUserProfile) {
		const { posts, name } = await getSavedPosts(userId);
		savedPosts = posts;
		authorName = name;
	}

	return <Posts posts={savedPosts} authorName={authorName} />;
}
