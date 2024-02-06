'use client';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import Portal from '@/lib/Portal/Portal';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';
import classes from './PostSettings.module.scss';
interface PostSettingsProps {
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	deletePost: (postId: string, userId: string) => void;
	postId: string;
	userId: string;
}

const PostSettings: React.FC<PostSettingsProps> = (props) => {
	const [isSettings, setIsSettings] = useState(false);

	const { isUserAuthor, isUserFollowingAuthor } = props;
	const handleClick = (
		event: React.MouseEvent<HTMLLIElement | HTMLDivElement>
	) => {
		event.stopPropagation();
		props.deletePost(props.postId, props.userId);
	};

	return (
		<>
			<button className={classes.button} onClick={() => setIsSettings(true)}>
				<BsThreeDots />
			</button>
			{isSettings && (
				<Portal>
					<Backdrop onClose={() => setIsSettings(false)}>
						<motion.div
							animate={{ scale: [1.5, 1], opacity: [0, 1] }}
							className={classes.settings}
						>
							<ul>
								{isUserAuthor && (
									<>
										<li onClick={handleClick} className={classes.red}>
											Delete
										</li>
										<li onClick={handleClick}>Edit</li>
										<li onClick={handleClick}>Hide like count to others</li>
										<li onClick={handleClick}>Turn off commenting</li>
										<li onClick={handleClick}>Archive</li>
									</>
								)}

								{!isUserAuthor && isUserFollowingAuthor && (
									<li onClick={handleClick} className={classes.red}>
										Unfollow
									</li>
								)}
								{!isUserAuthor && !isUserFollowingAuthor && (
									<li onClick={handleClick}>Follow</li>
								)}

								<li onClick={handleClick}>About this account</li>

								<li onClick={() => setIsSettings(false)}>Cancel</li>
							</ul>
						</motion.div>
					</Backdrop>
				</Portal>
			)}
		</>
	);
};

export default PostSettings;
