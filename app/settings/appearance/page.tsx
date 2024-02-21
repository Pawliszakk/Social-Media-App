import Appearance from '@/components/Settings/Appearanace/Appearance';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function AppearancePage() {
	const { session, user } = await getSessionData();

	const isDark = user?.theme === 'dark';
	const userId = user?.userId;

	return (
		<SettingPageBox
			name="Appearance"
			paragraph="You can switch between light and dark mode of application. You can switch in any moment and changes are reversible."
		>
			<Appearance isDark={isDark} userId={userId} />
		</SettingPageBox>
	);
}
