import BlockedUser from '@/components/Settings/Blocked/BlockedUser';
import SettingPageBox from '@/components/Settings/SettingPageBox';
import getBlockedUsers from '@/lib/actions/user/settings/getBlockedUsers';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
export default async function SettingsPage() {
	const { session, user } = await getSessionData();

	const userId = user?.userId;

	const blockedUsers = await getBlockedUsers(userId);
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
				blockedUsers.map((user: any) => {
					return (
						<BlockedUser
							key={user.id}
							name={user.name}
							image={user.image}
							imageType={user.imageType}
							profileId={user.id}
							userId={userId}
						/>
					);
				})
			)}
		</SettingPageBox>
	);
}
