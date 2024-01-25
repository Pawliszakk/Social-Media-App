import { checkSession } from '@/lib/actions/utils/checkSession';

export default async function SettingsPage() {
	await checkSession();

	return (
		<>
			<h1>Settings</h1>
		</>
	);
}
