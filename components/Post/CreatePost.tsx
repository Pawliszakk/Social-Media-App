import classes from './CreatePost.module.scss';
import { IoIosImages } from 'react-icons/io';
const CreatePost = () => {
	return (
		<div className={classes.post}>
			<header>
				<h1>Create new post</h1>
			</header>

			<div className={classes.photo}>
				<IoIosImages />
				<p>Choose image for your post</p>
                <button>Choose image</button>
			</div>
		</div>
	);
};

export default CreatePost;
