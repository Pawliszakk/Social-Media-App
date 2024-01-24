import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import ActionBar from '@/components/Nav/ActionBar';
import NextAuthProvider from '@/components/Auth/NextAuthProvider';

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
