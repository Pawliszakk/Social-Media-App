import { useEffect, useState } from 'react';
import ModalBox from '../ModalBox';
import classes from './UsersList.module.scss';
import { IoMdClose } from 'react-icons/io';
import Spinner from '../Spinner';
interface UsersListProps {
	profileId: string;
	onClose: () => void;
	followers?: boolean;
}

const UsersList: React.FC<UsersListProps> = (props) => {
	const [users, setUsers] = useState<null | any>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await fetch(
				`/api/user/${props.followers ? 'followers' : 'following'}/?profileId=${
					props.profileId
				}`
			);
			const fetchedUsers = await res.json();
			if (res.ok) {
				setUsers(fetchedUsers);
			}
		};

		fetchUserData();
	}, [props.profileId]);

	return (
		<ModalBox onClose={props.onClose} classname={classes.box}>
			<h3>
				{props.followers ? 'Followers' : 'Following'}
				<IoMdClose onClick={props.onClose} />
			</h3>
			<div className={classes.users}>
				{users &&
					users.length !== 0 &&
					users.map((user: any) => <p>{user.name}</p>)}
				{!users && <Spinner />}
			</div>
		</ModalBox>
	);
};

export default UsersList;
