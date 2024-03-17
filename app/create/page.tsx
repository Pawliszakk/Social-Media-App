import { permanentRedirect } from 'next/navigation';
import CreatePost from '@/components/Post/Create/CreatePost';
import { getUserData } from '@/lib/actions/utils/getUserData';

export default async function createPage() {
	const { session, user } = await getUserData('image name imageType');

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
