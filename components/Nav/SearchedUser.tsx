import Link from 'next/link';
import ProfileImage from '../UI/User/ProfileImage';
import classes from './SearchedUser.module.scss';

interface SearchedUserProps {
	user: {
		id: string;
		name: string;
		image: string;
		imageType: string;
	};
}

const SearchedUser: React.FC<SearchedUserProps> = ({ user }) => {
	return (
		<Link href={`/profile/${user.id}`} className={classes.user}>
			<ProfileImage
				name={user.name}
				image={user.image}
				imageType={user.imageType}
			/>
			<span>{user.name}</span>
		</Link>
	);
};

export default SearchedUser;
