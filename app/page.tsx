import SignInBtn from '@/components/Auth/SignInBtn';
import Component from '@/components/Component';
import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';

export default function Home() {
	const token = cookies().get('token');

	if (token) {
		return (
			<main>
				<h1>Zaloguj sie</h1>
				<SignInBtn />
			</main>
		);
	} else {
		permanentRedirect('/login');
	}
}
