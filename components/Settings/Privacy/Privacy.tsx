'use client';
import SwitchInput from '@/components/UI/SwitchInput';
import classes from './Privacy.module.scss';
import { privacyChange } from '@/lib/actions/user/settings/privacyChange';

interface PrivacyProps {
	userId: string;
	isPrivate: boolean;
}

const Privacy: React.FC<PrivacyProps> = (props) => {
	const handleSwitchToggle = (isPrivate: boolean) => {
		privacyChange(isPrivate, props.userId);
	};

	return (
		<div className={classes.box}>
			<span>Private account</span>
			<SwitchInput
				name="theme"
				label=""
				onToggle={handleSwitchToggle}
				isChecked={props.isPrivate}
			/>
		</div>
	);
};

export default Privacy;
