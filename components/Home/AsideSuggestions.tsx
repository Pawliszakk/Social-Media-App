import Link from 'next/link';
import ProfileImage from '../UI/User/ProfileImage';
import classes from './AsideSuggestions.module.scss';
import Footer from '../Footer/Footer';
import SuggestedUser from './SuggestedUser';
import { getSuggestedUsers } from '@/lib/actions/user/getSuggestedUsers';

interface AsideSuggestionsProps {
	image: string;
	imageType: string;
	name: string;
	userId: string;
}

const AsideSuggestions: React.FC<AsideSuggestionsProps> = async (props) => {
	const users = await getSuggestedUsers();
	return (
		<aside className={classes.aside}>
			<div className={classes.user}>
				<ProfileImage
					image={props.image}
					imageType={props.imageType}
					name={props.name}
					profileId={props.userId}
				/>
				<Link href={`/profile/${props.userId}`}>Pawliszakk</Link>
			</div>

			<div className={classes.suggestions}>
				<div className={classes.header}>
					<span>Suggested for you</span>
					<Link href="/explore/people">See All</Link>
				</div>
				<div className={classes.users}>
					{users.map(
						(user: {
							image: string;
							id: string;
							imageType: string;
							name: string;
						}) => {
							return (
								<SuggestedUser
									key={user.id}
									id={user.id}
									image={user.image}
									imageType={user.imageType}
									name={user.name}
									userId={props.userId}
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
