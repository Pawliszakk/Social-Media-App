import Link from 'next/link';
import ProfileImage from '../UI/User/ProfileImage';
import classes from './AsideSuggestions.module.scss';
import SuggestedUsers from './SuggestedUsers';
import Footer from '../Footer/Footer';

interface AsideSuggestionsProps {
	image: string;
	imageType: string;
	name: string;
	userId: string;
}

const AsideSuggestions: React.FC<AsideSuggestionsProps> = (props) => {
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
				<SuggestedUsers />
			</div>
			<Footer aside />
		</aside>
	);
};

export default AsideSuggestions;
