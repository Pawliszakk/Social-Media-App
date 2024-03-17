import ModalBox from '@/components/UI/ModalBox';
import Setting from '@/components/UI/Settings/Setting';
import { deleteComment } from '@/lib/actions/post/comments/deleteComment';

interface CommentSettingsProps {
	onClose: () => void;
	commentId: string;
	isUserAuthor: boolean;
}

const CommentSettings: React.FC<CommentSettingsProps> = (props) => {
	const handleDeleteCommentHandler = async () => {
		await deleteComment(props.commentId);
		// props.onClose();
	};

	return (
		<ModalBox onClose={props.onClose}>
			<ul>
				<Setting red onClick={handleDeleteCommentHandler}>
					{props.isUserAuthor ? 'Delete' : 'Report'}
				</Setting>
				<Setting onClick={props.onClose}>Cancel</Setting>
			</ul>
		</ModalBox>
	);
};

export default CommentSettings;
