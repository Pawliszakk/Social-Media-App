import Link from 'next/link';
import classes from './RecentSearch.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
import ProfileImage from '@/components/UI/User/ProfileImage';
import { removeSearchedUserFromRecent } from '@/lib/actions/user/removeSearchedUserFromRecent';

interface RecentSearchProps {
	user: {
		id: string;
		name: string;
		image: string;
		imageType: string;
	};
	onDeleteUser: (userId: string) => void;
	onClose: () => void;
}

const RecentSearch: React.FC<RecentSearchProps> = ({
	user,
	onDeleteUser,
	onClose,
}) => {
	const handleRemoveUser = () => {
		onDeleteUser(user.id);
		removeSearchedUserFromRecent(user.id);
	};
	return (
		<div className={classes.user}>
			<Link href={`/profile/${user.id}`} onClick={onClose}>
				<ProfileImage
					profileId={user.id}
					name={user.name}
					image={user.image}
					imageType={user.imageType}
				/>
				<span>{user.name}</span>
			</Link>
			<button onClick={handleRemoveUser}>
				<IoCloseOutline id={`user-${user.id}`} />
			</button>
		</div>
	);
};

export default RecentSearch;
