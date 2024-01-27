import Profile from '@/components/Profile/Profile';
import { getUserProfile } from '@/lib/actions/user/getUserProfile';

export default async function ProfilePage({
	params,
}: {
	params: { userId: string };
}) {
	const { userId } = params;

	const user = await getUserProfile(userId);
	if (!user) {
		throw new Error('Sorry, that site is unreachable');
	}

	return <Profile user={user} />;
}
