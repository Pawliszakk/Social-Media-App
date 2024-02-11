import Spinner from '@/components/UI/Spinner';
import { Suspense } from 'react';

import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { getProfilePosts } from '@/lib/actions/user/getProfilePosts';
import { checkIfUserIsAllowedToViewPosts } from '@/lib/actions/user/checkIfUserIsAllowedToViewPosts';
import Posts from '@/components/Profile/Posts/Posts';
import PrivateProfileFallback from '@/components/Profile/Posts/PrivateProfileFallback';
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

	console.log(savedPosts);
	console.log(authorName);
	return (
		<Suspense fallback={<Spinner />}>
			<Posts posts={savedPosts} authorName={authorName} />
		</Suspense>
	);
}
