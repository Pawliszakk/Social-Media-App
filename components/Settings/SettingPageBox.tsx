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
			<div>{props.children}</div>
		</div>
	);
};

export default SettingPageBox;
