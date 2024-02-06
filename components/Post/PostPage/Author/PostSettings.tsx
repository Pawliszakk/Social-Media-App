'use client';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import Portal from '@/lib/Portal/Portal';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';
import classes from './PostSettings.module.scss';
import { Actions } from '@/lib/constants/settingsActions';
import { turnOnCommenting } from '@/lib/actions/post/switchCommenting';

interface PostSettingsProps {
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	deletePost: (postId: string, userId: string) => void;
	turnOnCommenting: (postId: string, userId: string) => void;
	turnOffCommenting: (postId: string, userId: string) => void;
	hideLiking: (postId: string, userId: string) => void;
	showLiking: (postId: string, userId: string) => void;
	archivePost: (postId: string, userId: string) => void;

	postId: string;
	userId: string;
	commenting: boolean;
	hideLikesCount: boolean;
}

const PostSettings: React.FC<PostSettingsProps> = (props) => {
	const [isSettings, setIsSettings] = useState(false);

	const { isUserAuthor, isUserFollowingAuthor } = props;
	const handleClick = async (
		event: React.MouseEvent<HTMLLIElement | HTMLDivElement>,
		action: string
	) => {
		event.stopPropagation();
		switch (action) {
			case Actions.DELETE:
				props.deletePost(props.postId, props.userId);
				break;
			case Actions.EDIT:
				console.log('Edit action');
				break;
			case Actions.HIDE_LIKE_COUNT:
				await props.hideLiking(props.postId, props.userId);
				setIsSettings(false);
				break;
			case Actions.SHOW_LIKE_COUNT:
				await props.showLiking(props.postId, props.userId);
				setIsSettings(false);
				break;
			case Actions.HIDE_COMMENTING:
				await props.turnOffCommenting(props.postId, props.userId);
				setIsSettings(false);
				break;
			case Actions.SHOW_COMMENTING:
				await props.turnOnCommenting(props.postId, props.userId);
				setIsSettings(false);

				break;
			case Actions.ARCHIVE:
				props.archivePost(props.postId, props.userId);
				break;
			case Actions.UNFOLLOW:
				console.log('Unfollow action');
				break;
			case Actions.FOLLOW:
				console.log('Follow action');
				break;
			case Actions.ABOUT:
				console.log('About action');
				break;
			default:
				break;
		}
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
										<li
											onClick={(e) => handleClick(e, Actions.DELETE)}
											className={classes.red}
										>
											Delete
										</li>
										<li onClick={(e) => handleClick(e, Actions.EDIT)}>Edit</li>
										{props.hideLikesCount ? (
											<li
												onClick={(e) => handleClick(e, Actions.SHOW_LIKE_COUNT)}
											>
												Show like count to others
											</li>
										) : (
											<li
												onClick={(e) => handleClick(e, Actions.HIDE_LIKE_COUNT)}
											>
												Hide like count to others
											</li>
										)}
										{props.commenting ? (
											<li
												onClick={(e) => handleClick(e, Actions.HIDE_COMMENTING)}
											>
												Turn off commenting
											</li>
										) : (
											<li
												onClick={(e) => handleClick(e, Actions.SHOW_COMMENTING)}
											>
												Turn on commenting
											</li>
										)}
										<li onClick={(e) => handleClick(e, Actions.ARCHIVE)}>
											Archive
										</li>
									</>
								)}

								{!isUserAuthor && isUserFollowingAuthor && (
									<li
										onClick={(e) => handleClick(e, Actions.UNFOLLOW)}
										className={classes.red}
									>
										Unfollow
									</li>
								)}
								{!isUserAuthor && !isUserFollowingAuthor && (
									<li onClick={(e) => handleClick(e, Actions.FOLLOW)}>
										Follow
									</li>
								)}

								<li onClick={(e) => handleClick(e, Actions.ABOUT)}>
									About this account
								</li>

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
