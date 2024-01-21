import SignInBtn from '@/components/Auth/SignInBtn';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const LoginPage = async () => {
	const session = await getServerSession(authOptions);

	if (session) {
		console.log('jest sesja');
	} else {
		console.log('nie ma sesji');
	}

	return <SignInBtn />;
};

export default LoginPage;
