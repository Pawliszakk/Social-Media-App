import Image from 'next/image';
import classes from './PostImages.module.scss';

interface PostImagesProps {
	images: string | string[];
	author: string;
}

const PostImages: React.FC<PostImagesProps> = ({ images, author }) => {
	return (
		<div className={classes.images}>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${images}`}
				width={600}
				height={600}
				alt={`Post of ${author} user`}
			/>
		</div>
	);
};

export default PostImages;
