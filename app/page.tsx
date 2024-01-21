'use client';

import SignInBtn from '@/components/Auth/SignInBtn';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
	const { data: session, status } = useSession();

	const userImage = session?.user?.image;

	if (session) {
		return (
			<main>
				<h1>Logged as {session?.user?.name}</h1>
				<Image
					src={`${userImage ? userImage : '/default.jpg'}`}
					width={300}
					height={300}
				/>
				<SignInBtn />
			</main>
		);
	}
	return (
		<main>
			<h1>Social Media App</h1>
			<SignInBtn />
		</main>
	);
}
