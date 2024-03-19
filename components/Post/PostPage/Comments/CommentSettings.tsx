import ModalBox from '@/components/UI/ModalBox';
import Setting from '@/components/UI/Settings/Setting';
import { deleteComment } from '@/lib/actions/post/comments/deleteComment';
import { deleteReply } from '@/lib/actions/post/comments/deleteReply';

interface CommentSettingsProps {
	onClose: () => void;
	commentId: string;
	replyId?: string;
	isUserAuthor: boolean;
}

const CommentSettings: React.FC<CommentSettingsProps> = (props) => {
	const deleteCommentHandler = async () => {
		if (props.commentId && !props.replyId) {
			await deleteComment(props.commentId);
		}
		if (props.replyId) {
			await deleteReply(props.replyId, props.commentId);
		}

		props.onClose();
	};
	const reportCommentHandler = async () => {
		console.log('REPORTING COMMENT ');
	};
	return (
		<ModalBox onClose={props.onClose}>
			<ul>
				<Setting
					red
					onClick={
						props.isUserAuthor ? deleteCommentHandler : reportCommentHandler
					}
				>
					{props.isUserAuthor ? 'Delete' : 'Report'}
				</Setting>
				<Setting onClick={props.onClose}>Cancel</Setting>
			</ul>
		</ModalBox>
	);
};

export default CommentSettings;
