import Image from 'next/image';
import classes from './Post.module.scss';
import { PiChatCircleTextThin } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { CiSaveDown1 } from 'react-icons/ci';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { getSessionData } from '@/lib/actions/utils/getSessionData';

interface PostProps {
	id: string;
	author: string;
	commenting: boolean;
	date: string;
	likes: string[];
	comments: string[];
}

const Post = async (props: { image: string }) => {
	//DANE POBRANE Z POSTÓW

	const { name, email, image, userId } = await getSessionData();

	return (
		<article className={classes.post}>
			<div className={classes.author}>
				<div className={classes.image}>
					<Image src={`${image}`} width={100} height={100} alt="user" />
					<Link href="/profile/65b45a4e03170ff2ca0f64ec">{name}</Link>{' '}
					<span>17-03-2024</span>
				</div>
				<div>
					<button>...</button>
				</div>
			</div>
			<div className={classes.images}>
				<Image src={props.image} width={400} height={400} alt="Post" />
			</div>
			<div className={classes.actions}>
				<div>
					<CiHeart />
					<PiChatCircleTextThin />
				</div>
				<div>
					<CiSaveDown1 />
				</div>
			</div>
			<div className={classes.likes}>
				<p>
					<span>642</span> Likes
				</p>
			</div>

			<div className={classes.description}>
				<p>
					<Link href="/profile/65b45a4e03170ff2ca0f64ec">{name}</Link>{' '}
					Description to that post
				</p>
			</div>

			<div className={classes.comments}>
				<p>View all 23 comments</p>
			</div>

			<div className={classes.addComment}>
				<form action="">
					<textarea
						name=""
						id=""
						// cols="30"
						// rows="1"
						placeholder="Add comment..."
					></textarea>
				</form>
			</div>
			<hr />
		</article>
	);
};

export default Post;
