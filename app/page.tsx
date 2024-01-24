import { getServerSession } from 'next-auth';

import { permanentRedirect } from 'next/navigation';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function Home() {
	const session = await getServerSession();

	if (!session) {
		permanentRedirect('/auth/login');
	} else {
		const name = cookies().get('name');
		const image = cookies().get('image');
		return (
			<main>
				<h1>Cześć {`${name!.value}`}, zalogowano cię pomyślnie</h1>
				<Image
					src={`${image!.value}`}
					width={100}
					height={100}
					alt={`User image of ${name!.value}`}
				/>
			</main>
		);
	}
}
