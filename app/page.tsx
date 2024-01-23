import LogoutBtn from '@/components/Auth/Buttons/Logout';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { permanentRedirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();

	if (session) {
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
				<LogoutBtn />
			</main>
		);
	} else {
		permanentRedirect('/auth/login');
	}
}
