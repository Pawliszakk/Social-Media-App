import { permanentRedirect } from 'next/navigation';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import classes from './layout.module.scss';
import SettingsNavbar from '@/components/Settings/Navbar/SettingsNavbar';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { session, user } = await getSessionData();
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
