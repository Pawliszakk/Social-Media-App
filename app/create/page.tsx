import CreatePost from '@/components/Post/CreatePost';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

export default async function createPage() {
	const { image, name } = await getSessionData();

	return <CreatePost image={image} name={name} />;
}
