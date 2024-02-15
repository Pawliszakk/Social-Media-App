import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { getProfilePosts } from '@/lib/actions/user/getProfilePosts';
import { checkIfUserIsAllowedToViewPosts } from '@/lib/actions/user/checkIfUserIsAllowedToViewPosts';
import Posts from '@/components/Profile/Posts/Posts';
import PrivateProfileFallback from '@/components/Profile/Posts/PrivateProfileFallback';

export default async function ProfilePage({
	params,
}: {
	params: { userId: string };
}) {
	const { session, user } = await getSessionData();

	const { userId } = params;

	const isLoggedUserProfile = userId === user?.userId;

	let isUserAllowedToViewPosts;
	let isUserBlockingProfile;
	if (!isLoggedUserProfile) {
		const res = await checkIfUserIsAllowedToViewPosts(user?.userId, userId);

		isUserAllowedToViewPosts = res.isUserAllowedToViewPosts;

		isUserBlockingProfile = res.isUserBlockingProfile;
	}

	let profilePosts;
	let authorName;
	if (isUserAllowedToViewPosts || isLoggedUserProfile) {
		const { posts, name } = await getProfilePosts(userId);
		profilePosts = posts;
		authorName = name;
	}

	return (
		<>
			{!isUserBlockingProfile &&
			(isUserAllowedToViewPosts || isLoggedUserProfile) ? (
				<Posts posts={profilePosts} authorName={authorName} />
			) : isUserBlockingProfile ? null : (
				<PrivateProfileFallback />
			)}
		</>
	);
}
