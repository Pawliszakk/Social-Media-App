import Image from 'next/image';
import classes from './Author.module.scss';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface AuthorProps {
	user: {
		image: string;
		imageType: string;
		name: string;
	};
}
const Author: React.FC<AuthorProps> = ({ user }) => {
	return (
		<Link href="/stories/add" className={classes.author}>
			<Image
				src={
					user.imageType === 'provider'
						? `${user.image}`
						: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${user.image}`
				}
				width={56}
				height={56}
				alt={`${user.name} Profile picture`}
			/>
			<div className={classes.plus}>
				<FaPlus />
			</div>
		</Link>
	);
};

export default Author;
