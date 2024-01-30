import Image from 'next/image';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/actions/utils/checkSession';
import Post from '@/components/Post/Post';

export default async function Home({
	searchParams,
}: {
	searchParams: { create: string; search: string };
}) {
	await checkSession();

	const name = cookies().get('name');
	const image = cookies().get('image');

	const create = searchParams.create;
	const search = searchParams.search;
	return (
		<>
			<h1>Cześć {`${name!.value}`}, zalogowano cię pomyślnie</h1>
			<Image
				src={`${image!.value}`}
				width={100}
				height={100}
				alt={`User image of ${name!.value}`}
			/>

			<Post image="/assets/post1.jpg" />
			<Post image="/assets/post2.jpg" />
			<Post image="/assets/post3.jpg" />

			{create && <p>Ktoś tu chce tworzyć posta</p>}
			{search && <p>Szukanie osób</p>}
		</>
	);
}
