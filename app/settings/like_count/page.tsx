import LikesCount from '@/components/Settings/LikesCount/LikesCount';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function SettingsPage() {
	const { session, user } = await getUserData('showLikes');

	return (
		<SettingPageBox
			name="Number of likes and shares"
			paragraph="On Instagram, the number of likes of posts and rolls from other accounts will be hidden. You can hide the number of likes of your posts and rolls."
		>
			<LikesCount showLikes={!!user.showLikes} />
		</SettingPageBox>
	);
}
