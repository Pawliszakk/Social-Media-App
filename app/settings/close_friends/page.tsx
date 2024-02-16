import CloseFriend from '@/components/Settings/CloseFriends/CloseFriend';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import getFollowedUsers from '@/lib/actions/user/settings/getFollowedUsers';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function SettingsPage() {
	const { session, user } = await getSessionData();

	const { closeFriends, following } = await getFollowedUsers(user?.userId);

	return (
		<SettingPageBox
			name="Close friends"
			paragraph="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ex tempore exercitationem esse rerum eos fugiat nisi soluta provident nulla, eligendi optio voluptatem, libero velit nesciunt eius quidem magnam quas?"
		>
			{following.map((profile: any) => {
				const isUserCloseFriend = closeFriends.find(
					(id: string) => id.toString() === profile.id
				);
				return (
					<CloseFriend
						key={profile.id}
						image={profile.image}
						imageType={profile.imageType}
						name={profile.name}
						profileId={profile.id}
						isCloseFriend={!!isUserCloseFriend}
						userId={user?.userId}
					/>
				);
			})}
		</SettingPageBox>
	);
}
