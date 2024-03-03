import { getProfilePosts } from '@/lib/actions/user/getProfilePosts';
import { checkIfUserIsAllowedToViewPosts } from '@/lib/actions/user/checkIfUserIsAllowedToViewPosts';
import Posts from '@/components/Profile/Posts/Posts';
import PrivateProfileFallback from '@/components/Profile/Posts/PrivateProfileFallback';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function ProfilePage({
	params,
}: {
	params: { profileId: string };
}) {
	const { session, user } = await getUserData('showLikes');

	const { profileId } = params;
	const isLoggedUserProfile = profileId === user.id;

	let isUserAllowedToViewPosts;
	let isUserBlockingProfile;
	if (!isLoggedUserProfile) {
		const res = await checkIfUserIsAllowedToViewPosts(user.id, profileId);

		isUserAllowedToViewPosts = res.isUserAllowedToViewPosts;

		isUserBlockingProfile = res.isUserBlockingProfile;
	}

	let profilePosts;
	let authorName;
	if (isUserAllowedToViewPosts || isLoggedUserProfile) {
		const { posts, name } = await getProfilePosts(profileId);
		profilePosts = posts;
		authorName = name;
	}

	return (
		<>
			{!isUserBlockingProfile &&
			(isUserAllowedToViewPosts || isLoggedUserProfile) ? (
				<Posts
					posts={profilePosts}
					authorName={authorName}
					userId={user.id}
					showLikes={user.showLikes}
				/>
			) : isUserBlockingProfile ? null : (
				<PrivateProfileFallback />
			)}
		</>
	);
}
