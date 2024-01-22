import SignupButtons from '@/components/Auth/Buttons/SignupButtons';
import FormCard from '@/components/Auth/Forms/FormCard';
import LoginForm from '@/components/Auth/Forms/LoginForm';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';

export default async function LoginPage() {
	const session = await getServerSession();
	if (session) {
		permanentRedirect('/');
	}

	return (
		<div>
			<h1>LoginPage</h1>

			<FormCard>
				<SignupButtons />
				<LoginForm />
				<p>
					Don't have an account?
					<Link href="/auth/signup">Go to Signup page</Link>
				</p>
			</FormCard>
		</div>
	);
}
