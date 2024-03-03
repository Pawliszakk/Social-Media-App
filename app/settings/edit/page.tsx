import EditImage from '@/components/Settings/EditProfile/EditImage';
import EditProfileForm from '@/components/Settings/EditProfile/EditProfileForm';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function SettingsPage() {
	const { session, user } = await getUserData(
		'website',
		'bio',
		'sex',
		'name',
		'showInSuggestions',
		'image',
		'imageType',
		'name'
	);

	return (
		<SettingPageBox name="Edit profile" paragraph="">
			<EditImage
				image={user.image}
				imageType={user.imageType}
				userId={user.userId}
				name={user.name}
			/>
			<EditProfileForm
				bio={user.bio}
				sex={user.sex}
				website={user.website}
				name={`${user.name}`}
				showInSuggestions={!!user.showInSuggestions}
			/>
		</SettingPageBox>
	);
}
