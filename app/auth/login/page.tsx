import SignupButtons from '@/components/Auth/Buttons/SignupButtons';
import FormCard from '@/components/Auth/Forms/FormCard';
import LoginForm from '@/components/Auth/Forms/LoginForm';
import ErrorMessage from '@/components/Auth/Forms/ErrorMessage';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { permanentRedirect } from 'next/navigation';

export default async function LoginPage({
	searchParams,
}: {
	searchParams: { error: string };
}) {
	const session = await getServerSession();
	if (session) {
		permanentRedirect('/');
	}
	const error = searchParams.error;

	return (
		<div>
			<h1>LoginPage</h1>

			<FormCard>
				<SignupButtons />
				<LoginForm />
				{error && <ErrorMessage message={error} />}
				<p>
					Don't have an account?
					<Link href="/auth/signup">Go to Signup page</Link>
				</p>
			</FormCard>
		</div>
	);
}
