import LikesCount from '@/components/Settings/LikesCount/LikesCount';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function SettingsPage() {
	const { session, user } = await getSessionData();
	const userId = user?.userId;
	const showLikes = user?.showLikes;
	return (
		<SettingPageBox
			name="Number of likes and shares"
			paragraph="On Instagram, the number of likes of posts and rolls from other accounts will be hidden. You can hide the number of likes of your posts and rolls."
		>
			<LikesCount userId={userId} showLikes={!!showLikes} />
		</SettingPageBox>
	);
}
