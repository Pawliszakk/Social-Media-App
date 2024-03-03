import { permanentRedirect } from 'next/navigation';
import classes from './layout.module.scss';
import SettingsNavbar from '@/components/Settings/Navbar/SettingsNavbar';
import { getServerSession } from 'next-auth';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();

	if (!session) {
		permanentRedirect('/auth/login');
	}
	return (
		<div className={classes.box}>
			<SettingsNavbar />
			{children}
		</div>
	);
}
