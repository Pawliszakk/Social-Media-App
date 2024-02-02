import Profile from '@/components/Profile/Profile';
import Spinner from '@/components/UI/Spinner';
import { getUserProfile } from '@/lib/actions/user/getUserProfile';
import { Suspense } from 'react';

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

	return (
		<Suspense fallback={<Spinner />}>
			<Profile user={user} />
		</Suspense>
	);
}
