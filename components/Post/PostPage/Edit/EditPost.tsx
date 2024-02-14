'use client';

import classes from './EditPost.module.scss';
import Image from 'next/image';
import ProfileImage from '@/components/UI/User/ProfileImage';
interface EditPostProps {
	onClose: () => void;
	authorName: string;
	images: string | string[];
	userImage: string;
	userImageType: string;
}

const EditPost: React.FC<EditPostProps> = (props) => {
	return (
		<div className={classes.edit}>
			<header>
				<button className={classes.cancel} onClick={props.onClose}>
					Cancel
				</button>
				<span>Edit Info</span>
				<button className={classes.done}>Done</button>
			</header>
			<div className={classes.content}>
				<div className={classes.images}>
					<Image
						src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.images}`}
						width={600}
						height={600}
						alt={`Post of ${props.authorName} user`}
					/>
				</div>
				<div className={classes.panel}>
					<div className={classes.author}>
						<ProfileImage
							image={props.userImage}
							imageType={props.userImageType}
							name={props.authorName}
						/>
						<span>{props.authorName}</span>
					</div>

					<form>
						<textarea
							name="description"
							id="description"
							placeholder="Write a caption..."
						></textarea>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditPost;
