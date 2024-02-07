'use client';
import { useState } from 'react';
import {
	DELETE,
	EDIT,
	SWITCH_LIKE_COUNT,
	SWITCH_COMMENTING,
	ARCHIVE,
	UNFOLLOW,
	FOLLOW,
	ABOUT,
} from '@/lib/constants/settingsActions';
import Setting from './Setting';
import AccountAbout from './AccountAbout';
import SettingsBox from './SettingsBox';
import SettingsButton from './SettingsButton';

interface PostSettingsProps {
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	deletePost: (postId: string, userId: string) => void;
	switchCommenting: (postId: string, userId: string) => void;
	switchLiking: (postId: string, userId: string) => void;
	archivePost: (postId: string, userId: string) => void;
	postId: string;
	authorId: string;
	userId: string;
	commenting: boolean;
	hideLikesCount: boolean;
}

const PostSettings: React.FC<PostSettingsProps> = ({
	isUserAuthor,
	isUserFollowingAuthor,
	deletePost,
	switchCommenting,
	switchLiking,
	archivePost,
	postId,
	authorId,
	userId,
	commenting,
	hideLikesCount,
}) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);

	const handleClick = async (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>,
		action: string
	) => {
		e.stopPropagation();
		switch (action) {
			case DELETE:
				deletePost(postId, userId);
				break;
			case EDIT:
				console.log('Edit action');
				break;
			case SWITCH_LIKE_COUNT:
				await switchLiking(postId, userId);
				setIsSettings(false);
				break;
			case SWITCH_COMMENTING:
				await switchCommenting(postId, userId);
				setIsSettings(false);
				break;
			case ARCHIVE:
				archivePost(postId, userId);
				break;
			case UNFOLLOW:
				console.log('Unfollow action');
				break;
			case FOLLOW:
				console.log('Follow action');
				break;
			case ABOUT:
				setIsAboutComponent(true);
				break;
			default:
				break;
		}
	};

	return (
		<>
			<SettingsButton onClick={() => setIsSettings(true)} />
			{isSettings && (
				<SettingsBox onClose={() => setIsSettings(false)}>
					{!isAboutComponent && (
						<ul>
							{isUserAuthor && (
								<>
									<Setting onClick={(e) => handleClick(e, DELETE)} red>
										Delete
									</Setting>
									<Setting onClick={(e) => handleClick(e, EDIT)}>Edit</Setting>
									<Setting onClick={(e) => handleClick(e, SWITCH_LIKE_COUNT)}>
										{hideLikesCount ? 'Show likes count' : 'Hide likes count'}
									</Setting>
									<Setting onClick={(e) => handleClick(e, SWITCH_COMMENTING)}>
										{commenting ? 'Turn off commenting' : 'Turn on commenting'}
									</Setting>
									<Setting onClick={(e) => handleClick(e, ARCHIVE)}>
										Archive
									</Setting>
								</>
							)}

							{!isUserAuthor && isUserFollowingAuthor && (
								<Setting onClick={(e) => handleClick(e, UNFOLLOW)} red>
									Unfollow
								</Setting>
							)}

							{!isUserAuthor && !isUserFollowingAuthor && (
								<Setting onClick={(e) => handleClick(e, FOLLOW)}>
									Follow
								</Setting>
							)}

							{!isUserAuthor && (
								<Setting onClick={(e) => handleClick(e, ABOUT)}>
									About this account
								</Setting>
							)}

							<Setting onClick={() => setIsSettings(false)}>Cancel</Setting>
						</ul>
					)}
					{isAboutComponent && (
						<AccountAbout
							userId={authorId}
							onClose={(
								e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
							) => {
								e.stopPropagation();
								setIsAboutComponent(false);
								setIsSettings(false);
							}}
						/>
					)}
				</SettingsBox>
			)}
		</>
	);
};

export default PostSettings;
