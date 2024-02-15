import Spinner from '../UI/Spinner';
import classes from './SettingsPageLoading.module.scss';

const SettingsPageLoading = () => {
	return (
		<div className={classes.box}>
			<Spinner className={classes.spinner} />
		</div>
	);
};

export default SettingsPageLoading;
