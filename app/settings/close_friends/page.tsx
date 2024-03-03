import CloseFriend from '@/components/Settings/CloseFriends/CloseFriend';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import getFollowedUsers from '@/lib/actions/user/settings/getFollowedUsers';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function SettingsPage() {
	const { session, user } = await getUserData('closeFriends, following');

	const { closeFriends, following } = await getFollowedUsers(user.id);

	const transformedFollowing = following.map((profile: any) => {
		const isUserCloseFriend = closeFriends.find(
			(id: string) => id.toString() === profile.id
		);

		return {
			id: profile.id,
			name: profile.name,
			image: profile.image,
			imageType: profile.imageType,
			isCloseFriend: !!isUserCloseFriend,
		};
	});

	transformedFollowing.sort((a: any, b: any) =>
		a.isCloseFriend === b.isCloseFriend ? 0 : a.isCloseFriend ? -1 : 1
	);

	return (
		<SettingPageBox
			name="Close friends"
			paragraph="Here you can manage your close friends list. We do not send notifications for editing the list of close friends."
		>
			{transformedFollowing.length === 0 || !transformedFollowing ? (
				<p style={{ textAlign: 'center' }}>
					We found no users you are currently following.
				</p>
			) : (
				transformedFollowing.map((profile: any) => {
					return (
						<CloseFriend
							key={profile.id}
							image={profile.image}
							imageType={profile.imageType}
							name={profile.name}
							profileId={profile.id}
							isCloseFriend={profile.isCloseFriend}
							userId={user.id}
						/>
					);
				})
			)}
		</SettingPageBox>
	);
}
