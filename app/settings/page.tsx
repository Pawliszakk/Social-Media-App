import { permanentRedirect } from 'next/navigation';

const SettingsPage = () => {
	permanentRedirect('/settings/edit');
};

export default SettingsPage;
