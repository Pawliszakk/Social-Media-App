'use client';

import classes from './EditPost.module.scss';
import Image from 'next/image';
import ProfileImage from '@/components/UI/User/ProfileImage';
interface EditPostProps {
	onClose: (e: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => void;
	authorName: string;
	images: string | string[];
	userImage: string;
	userImageType: string;
}

const EditPost: React.FC<EditPostProps> = (props) => {
	return (
		<div className={classes.box}>
			<header>
				<button className={classes.cancel} onClick={() => props.onClose}>
					Cancel
				</button>
				<h3>Edit Info</h3>
				<button className={classes.done}>Done</button>
			</header>
			<div className={classes.contentBox}>
				<div className={classes.images}>
					{' '}
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
					<div className={classes.description}>
						<form>
							<textarea name="description" id="description"></textarea>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPost;
