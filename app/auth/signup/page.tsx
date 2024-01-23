import SignupForm from '@/components/Auth/Forms/SignupForm';
import FormCard from '@/components/Auth/Forms/FormCard';
import Link from 'next/link';
import SignupButtons from '@/components/Auth/Buttons/SignupButtons';
import { permanentRedirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function SignupPage() {
	const session = await getServerSession();
	if (session) {
		permanentRedirect('/');
	}
	return (
		<div>
			<FormCard>
				<h1>Sign up</h1>

				<SignupButtons />
				<SignupForm />
				<p>
					Already have an account?{' '}
					<Link href="/auth/login">Go to login page</Link>
				</p>
			</FormCard>
		</div>
	);
}
