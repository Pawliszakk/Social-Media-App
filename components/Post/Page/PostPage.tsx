import Image from 'next/image';
import classes from './PostPage.module.scss';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { CiSaveDown1 } from 'react-icons/ci';

const PostPage = () => {
	return (
		<div className={classes.box}>
			<div className={classes.image}>{/* <Image src=''/> */}</div>
			<div className={classes.panel}>
				<div className={classes.author}>
					<div className={classes.image}>
						{/* <Image/> */}
						<span>
							{'<UserName>'} {'<If followed>'}
						</span>
					</div>
					<button className={classes.button}>...</button>
				</div>

				<div className={classes.comments}>
					<p>Description from author if exists</p>
					<h1>Comment components</h1>
				</div>

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
						<span>{'<Likes Count>'}</span> Likes
					</p>
					<p className={classes.date}>{'<Post Date>'}</p>
				</div>

				<div className={classes.commentAdd}>
					{/* <Image /> */}
					{/* zdjecie usera zalogowanego */}
				</div>
			</div>
		</div>
	);
};

export default PostPage;
