import Image from 'next/image';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/actions/utils/checkSession';

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
		<main>
			<h1>Cześć {`${name!.value}`}, zalogowano cię pomyślnie</h1>
			<Image
				src={`${image!.value}`}
				width={100}
				height={100}
				alt={`User image of ${name!.value}`}
			/>

			{create && <p>Tworzenie posta</p>}
			{search && <p>Szukanie osób</p>}
			<div style={{ height: '420vh' }}></div>
		</main>
	);
}
