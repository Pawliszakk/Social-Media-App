import EditImage from '@/components/Settings/EditProfile/EditImage';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function SettingsPage() {
	const { session, user } = await getSessionData();

	return (
		<SettingPageBox name="Edit profile" paragraph="">
			<EditImage
				image={user?.image}
				imageType={user?.imageType}
				userId={user?.userId}
				name={user?.name}
			/>
		</SettingPageBox>
	);
}
