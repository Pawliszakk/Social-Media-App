import type { Metadata } from 'next';
import './globals.css';
import NextAuthProvider from '@/lib/auth/NextAuthProvider';
import { getServerSession } from 'next-auth';
import ActionBar from '@/components/Nav/ActionBar';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body>
				<div>
					{session && <ActionBar />}
					<NextAuthProvider>{children}</NextAuthProvider>
				</div>
			</body>
		</html>
	);
}
