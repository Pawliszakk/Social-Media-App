import { useState } from 'react';
import classes from './Replies.module.scss';
import Spinner from '@/components/UI/Spinner';
import Reply from './Reply';

interface RepliesProps {
	repliesNumber: number;
	commentId: string;
}

const Replies: React.FC<RepliesProps> = ({ repliesNumber, commentId }) => {
	const [replies, setReplies] = useState<null | []>(null);
	const [showReplies, setShowReplies] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const repliesHandler = async () => {
		if (showReplies) {
			setShowReplies(false);
		} else {
			setIsLoading(true);
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
		<div className={classes.reply} onClick={repliesHandler}>
			<div className={classes.line}></div>
			{showReplies ? (
				<>
					<div className={classes.replies}>
						<span>Hide replies</span>
						{isLoading && <Spinner />}

						{replies &&
							replies.length > 0 &&
							replies.map((reply) => <Reply reply={reply} />)}
					</div>
				</>
			) : (
				<span>View replies ({repliesNumber})</span>
			)}
		</div>
	);
};

export default Replies;
