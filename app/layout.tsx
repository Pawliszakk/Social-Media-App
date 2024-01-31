import type { Metadata } from 'next';
import './globals.css';
import classes from './layout.module.scss';
import { getServerSession } from 'next-auth';
import ActionBar from '@/components/Nav/ActionBar';
import NextAuthProvider from '@/components/Auth/NextAuthProvider';
import Footer from '@/components/Footer/Footer';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { checkSession } from '@/lib/actions/utils/checkSession';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { session, user } = await getSessionData();
	return (
		<html lang="en">
			<body data-theme={user ? user.theme : ''}>
				<div>
					{session && (
						<ActionBar
							name={user.name}
							image={user.image}
							userId={user.userId}
						/>
					)}
					<main className={session ? classes.main : ''}>
						<NextAuthProvider>{children}</NextAuthProvider>
					</main>
					{/* <Footer /> */}
				</div>
			</body>
		</html>
	);
}
