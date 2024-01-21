'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const SignInBtn = () => {
	const { status } = useSession();
	console.log(status);
	if (status === 'loading') {
		return <p>loading....</p>;
	}

	return (
		<>
			<button onClick={() => signIn()}>
				<span>Login with Google</span>
			</button>
			<button onClick={() => signIn('github')}>
				<span>Login with github</span>
			</button>
			<button onClick={() => signOut()}>Wyloguj sie</button>
		</>
	);
};

export default SignInBtn;
