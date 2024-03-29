import Privacy from '@/components/Settings/Privacy/Privacy';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function SettingsPage() {
	const { session, user } = await getUserData('private');

	return (
		<SettingPageBox
			name="Privacy"
			paragraph="When your account is public, your profile and posts can be seen by anyone, on or off Instagram, even if they don't have an Instagram account.
			When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists"
		>
			<Privacy isPrivate={user.private} />
		</SettingPageBox>
	);
}
