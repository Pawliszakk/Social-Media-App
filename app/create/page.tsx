import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import CreatePost from '@/components/Post/Create/CreatePost';

export default async function createPage() {
	const { session, user } = await getSessionData();
	if (!session) {
		permanentRedirect('/auth/login');
	}

	return (
		<CreatePost
			image={user.image}
			name={user.name}
			imageType={user.imageType}
		/>
	);
}
