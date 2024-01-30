import CreatePost from '@/components/Post/CreatePost';
import { checkSession } from '@/lib/actions/utils/checkSession';
import { cookies } from 'next/headers';

export default async function createPage() {
	await checkSession();

	const image = cookies().get('image')!.value;
	const name = cookies().get('name')!.value;

	return <CreatePost image={image} name={name} />;
}
