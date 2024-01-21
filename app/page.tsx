import LogoutBtn from '@/components/Auth/Buttons/Logout';
import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

export default async function Home() {
	const session = await getServerSession();

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
