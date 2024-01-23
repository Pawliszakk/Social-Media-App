import LogoutBtn from '@/components/Auth/Buttons/Logout';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();

	const user = cookies().get('user');

	console.log(user);

	if (session) {
		return (
			<main>
				<h1>Masz dostęp do aplikacji</h1>
				<LogoutBtn />
			</main>
		);
	} else {
		permanentRedirect('/auth/login');
	}
}
