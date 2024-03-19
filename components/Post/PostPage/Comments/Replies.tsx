import { Suspense, useState } from 'react';
import classes from './Replies.module.scss';
import Spinner from '@/components/UI/Spinner';
import Reply from './Reply';

interface RepliesProps {
	repliesNumber: number;
	commentId: string;
	userId: string;
}

const Replies: React.FC<RepliesProps> = ({
	repliesNumber,
	commentId,
	userId,
}) => {
	const [replies, setReplies] = useState<null | []>(null);
	const [showReplies, setShowReplies] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const repliesHandler = async () => {
		if (showReplies) {
			setShowReplies(false);
		} else {
			if (!replies) {
				setIsLoading(true);
			}
			setShowReplies(true);
			const res = await fetch(
				`/api/post/comment/replies/?commentId=${commentId}`
			);
			if (res.ok) {
				const fetchedReplies = await res.json();
				setReplies(fetchedReplies);
			} else {
				setShowReplies(false);
			}
			setIsLoading(false);
		}
	};

	return (
		<div className={classes.box}>
			<div className={classes.buttons}>
				<div className={classes.line} onClick={repliesHandler}></div>
				{showReplies ? (
					<>
						<span className={classes.hide} onClick={repliesHandler}>
							Hide replies {isLoading && <Spinner />}
						</span>
					</>
				) : (
					<span onClick={repliesHandler}>View replies ({repliesNumber})</span>
				)}
			</div>
			<div className={classes.replies}>
				{showReplies &&
					replies &&
					replies.length > 0 &&
					replies.map((reply: any) => (
						<Reply key={reply.id} reply={reply} userId={userId} />
					))}
			</div>
		</div>
	);
};

export default Replies;
