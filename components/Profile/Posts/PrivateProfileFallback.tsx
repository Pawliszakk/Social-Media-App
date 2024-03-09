import { CiLock } from 'react-icons/ci';
import classes from './PrivateProfileFallback.module.scss';
const PrivateProfileFallback = ({ classname }: { classname?: string }) => {
	return (
		<div className={`${classes.private} ${classname ? classname : null}`}>
			<div className={classes.icon}>
				<CiLock />
			</div>
			<div>
				<p>This Account is Private</p>
				<p>Follow to see their posts.</p>
			</div>
		</div>
	);
};

export default PrivateProfileFallback;
