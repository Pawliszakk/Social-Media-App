import CloseFriend from '@/components/Settings/CloseFriends/CloseFriend';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import getFollowedUsers from '@/lib/actions/user/settings/getFollowedUsers';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function SettingsPage() {
	const { session, user } = await getSessionData();

	const { closeFriends, following } = await getFollowedUsers(user?.userId);

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
			paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ex tempore exercitationem esse rerum eos fugiat nisi soluta provident nulla, eligendi optio voluptatem, libero velit nesciunt eius quidem magnam quas?"
		>
			{transformedFollowing.map((profile: any) => {
				return (
					<CloseFriend
						key={profile.id}
						image={profile.image}
						imageType={profile.imageType}
						name={profile.name}
						profileId={profile.id}
						isCloseFriend={profile.isCloseFriend}
						userId={user?.userId}
					/>
				);
			})}
		</SettingPageBox>
	);
}
