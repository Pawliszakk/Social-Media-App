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

	return (
		<article className={classes.post}>
			<div className={classes.author}>
				<div className={classes.image}>
					<Image
						src="/assets/defaultUser.jpg"
						width={100}
						height={100}
						alt="user"
					/>
					<Link href="/profile/65b45a4e03170ff2ca0f64ec">{'<USER NAME> '}</Link>{' '}
					<span>{'<DATA POSTA> '}</span>
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
					<span>{'<LIKES COUNT IF NOT HIDDEN>'}</span> Likes
				</p>
			</div>

			<div className={classes.description}>
				<p>
					<Link href="/profile/65b45a4e03170ff2ca0f64ec">{'<USERNAME>'}</Link>{' '}
					{'<DESCRIPTION> '}
				</p>
			</div>

			<div className={classes.comments}>
				<p>
					View all {'<NUM OF COMMENTS IF COMMENTS AND IF COMMENTING>'} comments
				</p>
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
