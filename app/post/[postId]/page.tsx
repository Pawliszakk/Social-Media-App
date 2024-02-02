import { getPostById } from '@/lib/actions/post/getPostById';
import { getSessionData } from '@/lib/actions/utils/getSessionData';
import { permanentRedirect } from 'next/navigation';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiSaveDown1 } from 'react-icons/ci';
import classes from './page.module.scss';
import Image from 'next/image';
import PostAuthor from '@/components/Post/PostPage/PostAuthor';
import PostComments from '@/components/Post/PostPage/PostComments';
import PostAddComment from '@/components/Post/PostPage/PostAddComment';

const postPage = async ({ params }: { params: { postId: string } }) => {
	const { session, user } = await getSessionData();
	if (!session) {
		permanentRedirect('/auth/login');
	}
	const { post, isUserAllowedToView, isUserAuthor } = await getPostById(
		params.postId,
		user?.userId
	);
	const postAuthor = post.author.toString();

	if (!isUserAllowedToView) {
		permanentRedirect(`/profile/${postAuthor}`);
	}

	//CHECK IF COMMENTING IS SET TO ON

	return (
		<div className={classes.box}>
			<Image
				src={`https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${post.image}`}
				width={600}
				height={600}
				alt={`Post of ${post.author.name} user`}
			/>
			<div className={classes.panel}>
				<PostAuthor
					name={post.author.name}
					image={post.author.image}
					description={post.description}
					authorId={post.author.id}
					date={post.date}
				/>

				<PostComments isCommenting={post.commenting} />

				<div className={classes.actions}>
					<div>
						<FaRegHeart />
						<FiMessageCircle />
					</div>
					<div>
						<CiSaveDown1 />
					</div>
				</div>
				<div className={classes.likes}>
					<p>
						<span>{post.likes.length}</span> Likes
					</p>
					<p className={classes.date}>{post.date}</p>
				</div>

				{post.commenting && (
					<PostAddComment
						name={user.name}
						image={user.image}
						userId={user.userId}
					/>
				)}
			</div>
		</div>
	);
};

export default postPage;
