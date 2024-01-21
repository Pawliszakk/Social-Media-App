'use client';

import { signIn, signOut } from 'next-auth/react';

const SignInBtn = () => {
	return (
		<>
			<button onClick={() => signIn('google')}>
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
