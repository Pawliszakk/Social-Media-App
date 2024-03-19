import { useEffect, useState } from 'react';
import classes from './LikesModal.module.scss';
import { IoMdClose } from 'react-icons/io';
import SuggestedUser from '@/components/Home/SuggestedUser';
import ModalBox from '@/components/UI/ModalBox';
import Spinner from '@/components/UI/Spinner';
interface LikesModalProps {
	userId: string;
	commentId?: string;
	replyId?: string;
	onClose: () => void;
}

const LikesModal: React.FC<LikesModalProps> = (props) => {
	const [users, setUsers] = useState<null | any>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const URL = props.commentId
				? `/api/post/comment/likes/?commentId=${props.commentId}`
				: `/api/post/comment/replies/likes?replyId=${props.replyId}`;
			const res = await fetch(URL);
			const fetchedUsers = await res.json();
			if (res.ok) {
				setUsers(fetchedUsers);
			}
		};

		fetchUserData();
	}, [props.commentId]);
	return (
		<ModalBox onClose={props.onClose} classname={classes.box}>
			<h3>
				Likes
				<IoMdClose onClick={props.onClose} />
			</h3>
			<div className={classes.users}>
				{users &&
					users.length !== 0 &&
					users.map((user: any) => {
						return (
							<SuggestedUser
								key={user._id}
								id={user._id}
								image={user.image}
								name={user.name}
								imageType={user.imageType}
								followingStatus={user.followingStatus}
								userId={props.userId}
								button
								isLoggedUser={user._id.toString() === props.userId}
							/>
						);
					})}
				{!users && <Spinner className={classes.spinner} />}
			</div>
		</ModalBox>
	);
};

export default LikesModal;
