import { Suspense } from 'react';
import classes from './SettingPageBox.module.scss';

interface SettingPageBoxProps {
	name: string;
	children: React.ReactNode;
	paragraph: string;
}
const SettingPageBox: React.FC<SettingPageBoxProps> = (props) => {
	return (
		<div className={classes.box}>
			<h2>{props.name}</h2>
			<p>{props.paragraph}</p>
			{props.children}
		</div>
	);
};

export default SettingPageBox;
