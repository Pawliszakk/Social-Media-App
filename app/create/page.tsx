import CreatePost from '@/components/Post/CreatePost';
import { checkSession } from '@/lib/actions/utils/checkSession';

export default async function createPage() {
	await checkSession();

	return <CreatePost />;
}
