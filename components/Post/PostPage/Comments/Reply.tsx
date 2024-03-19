import classes from './Reply.module.scss';

interface ReplyProps {
	reply: {
		id: string;
		likes: number;
		isUserLikingComment: boolean;
		date: string;
		content: string;
		author: {
			name: string;
			id: string;
			image: string;
			imageType: string;
		};
	};
}
const Reply: React.FC<ReplyProps> = (props) => {
	return <div className={classes.box}>Reply</div>;
};

export default Reply;
