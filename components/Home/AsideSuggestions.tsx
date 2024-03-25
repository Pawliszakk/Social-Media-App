import Link from 'next/link';
import ProfileImage from '../UI/User/ProfileImage';
import classes from './AsideSuggestions.module.scss';
import Footer from '../Footer/Footer';
import SuggestedUser from './SuggestedUser';
import { getSuggestedUsers } from '@/lib/actions/user/get/getSuggestedUsers';
import Logout from './Logout';

interface AsideSuggestionsuser {
	user: {
		id: string;
		image: string;
		imageType: string;
		name: string;
	};
}

const AsideSuggestions: React.FC<AsideSuggestionsuser> = async ({ user }) => {
	const { userId, users } = await getSuggestedUsers(6);
	return (
		<aside className={classes.aside}>
			<div className={classes.box}>
				<div className={classes.user}>
					<ProfileImage
						image={user.image}
						imageType={user.imageType}
						name={user.name}
						profileId={user.id}
					/>
					<Link href={`/profile/${user.id}`}>{user.name}</Link>
				</div>
				<Logout />
			</div>

			<div className={classes.suggestions}>
				<div className={classes.header}>
					<span>Suggested for you</span>
					<Link href="/explore/people">See All</Link>
				</div>
				<div className={classes.users}>
					{users.map(
						(fetchedUser: {
							image: string;
							id: string;
							imageType: string;
							name: string;
						}) => {
							return (
								<SuggestedUser
									key={fetchedUser.id}
									id={fetchedUser.id}
									image={fetchedUser.image}
									imageType={fetchedUser.imageType}
									name={fetchedUser.name}
									userId={userId}
								/>
							);
						}
					)}
				</div>
			</div>
			<Footer aside />
		</aside>
	);
};

export default AsideSuggestions;
