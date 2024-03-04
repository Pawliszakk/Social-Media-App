import { getSuggestedUsers } from '@/lib/actions/user/getSuggestedUsers';
import classes from './SuggestedUsers.module.scss';
import ProfileImage from '../UI/User/ProfileImage';
import Link from 'next/link';

const SuggestedUsers = async () => {
	const users = await getSuggestedUsers();

	return (
		<div className={classes.users}>
			{users.map(
				(user: {
					image: string;
					id: string;
					imageType: string;
					name: string;
				}) => (
					<div className={classes.user} key={user.id}>
						<div className={classes.image}>
							<ProfileImage
								image={user.image}
								imageType={user.imageType}
								name={user.name}
								profileId={user.id.toString()}
							/>
							<div className={classes.name}>
								<Link href={`/profile/${user.id}`}>{user.name}</Link>
								<span>suggested for you</span>
							</div>
						</div>
						<div className={classes.button}>
							<button>follow</button>
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default SuggestedUsers;
