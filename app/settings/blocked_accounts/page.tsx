import BlockedUser from '@/components/Settings/Blocked/BlockedUser';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import getBlockedUsers from '@/lib/actions/user/settings/getBlockedUsers';
import { getUserData } from '@/lib/actions/utils/getUserData';
export default async function SettingsPage() {
	const { session, user } = await getUserData();

	const blockedUsers = await getBlockedUsers(user.id);
	console.log(blockedUsers);
	return (
		<SettingPageBox
			name="Blocked accounts"
			paragraph="You can block people anytime from their profiles."
		>
			{!blockedUsers || blockedUsers.length === 0 ? (
				<p style={{ textAlign: 'center', margin: '2rem' }}>
					You haven&apos;t blocked anyone yet.
				</p>
			) : (
				blockedUsers.map(
					(blockedUser: {
						id: string;
						image: string;
						imageType: string;
						name: string;
					}) => <BlockedUser key={blockedUser.id} user={blockedUser} />
				)
			)}
		</SettingPageBox>
	);
}
