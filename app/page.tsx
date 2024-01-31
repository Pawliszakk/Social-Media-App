import { checkSession } from '@/lib/actions/utils/checkSession';
import Post from '@/components/Post/Post';
import PostsVariant from '@/components/Home/PostsVariant';

export default async function Home({
	searchParams,
}: {
	searchParams: { create: string; search: string };
}) {
	await checkSession();

	const search = searchParams.search;
	return (
		<>
			{search && <p>Szukanie osób</p>}
			<PostsVariant />

			<Post image="/assets/post1.jpg" />
			<Post image="/assets/post2.jpg" />
			<Post image="/assets/post3.jpg" />
		</>
	);
}
