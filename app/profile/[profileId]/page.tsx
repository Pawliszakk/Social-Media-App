import Posts from '@/components/Profile/Posts/Posts';
import PrivateProfileFallback from '@/components/Profile/Posts/PrivateProfileFallback';
import { getProfilePageData } from '@/lib/actions/utils/profile/getProfilePageData';

export default async function ProfilePage({
	params,
}: {
	params: { profileId: string };
}) {
	const { profileId } = params;
	const {
		user,
		isUserAllowedToViewPosts,
		isUserBlockingProfile,
		isLoggedUserProfile,
		profilePosts,
		authorName,
	} = await getProfilePageData(profileId);

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
