import PeopleLinks from '@/components/Explore/PeopleLinks';
import classes from './layout.module.scss';

const ExplorePeopleLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className={classes.box}>
			<PeopleLinks />

			<div className={classes.users}>{children}</div>
		</div>
	);
};

export default ExplorePeopleLayout;
