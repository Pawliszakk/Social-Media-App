import AuthForm from '@/components/Auth/AuthForm';
import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

export default async function LoginPage() {
	const session = await getServerSession();
	if (session) {
		permanentRedirect('/');
	}
	return (
		<div>
			<h1>LoginPage</h1>
			<AuthForm login />
		</div>
	);
}
