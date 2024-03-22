import Link from 'next/link';
import classes from './SearchedUser.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { addSearchedUserToRecent } from '@/lib/actions/user/addSearchedUserToRecent';

interface SearchedUserProps {
	closeSearchBar: () => void;
	user: {
		id: string;
		name: string;
		image: string;
		imageType: string;
	};
}

const SearchedUser: React.FC<SearchedUserProps> = ({
	user,
	closeSearchBar,
}) => {
	const addUserToRecentHandler = () => {
		closeSearchBar();
		addSearchedUserToRecent(user.id);
	};

	return (
		<Link
			onClick={addUserToRecentHandler}
			href={`/profile/${user.id}`}
			className={classes.user}
		>
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
