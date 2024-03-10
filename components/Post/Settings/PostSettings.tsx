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
import SettingsButton from '@/components/UI/Settings/SettingsButton';
import SettingsBox from '@/components/UI/Settings/SettingsBox';
import AccountAbout from '@/components/UI/Settings/AccountAbout';
import Setting from '@/components/UI/Settings/Setting';
import EditPost from '../PostPage/Edit/EditPost';
import { followUser, unFollowUser } from '@/lib/actions/user/followUser';
import { deletePost } from '@/lib/actions/post/deletePost';
import { archivePost } from '@/lib/actions/post/archivePost';
interface PostSettingsProps {
	postId: string;
	authorId: string;
	images: string | string[];
	authorName: string;
	userImage: string;
	userImageType: string;
	userId: string;
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
	commenting: boolean;
	hideLikesCount: boolean;
	switchCommenting: (postId: string, userId: string) => void;
	switchLiking: (postId: string, userId: string) => void;
}

const PostSettings: React.FC<PostSettingsProps> = ({
	isUserAuthor,
	isUserFollowingAuthor,
	switchCommenting,
	switchLiking,
	postId,
	authorId,
	userId,
	commenting,
	hideLikesCount,
	images,
	authorName,
	userImage,
	userImageType,
}) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);
	const [isEditComponent, setIsEditComponent] = useState(false);

	const handleClick = async (action: string) => {
		switch (action) {
			case DELETE:
				deletePost(postId);
				break;
			case EDIT:
				setIsEditComponent(true);
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
				archivePost(postId);
				break;
			case UNFOLLOW:
				await unFollowUser(authorId);
				setIsSettings(false);
				break;
			case FOLLOW:
				await followUser(authorId);
				setIsSettings(false);
				break;
			case ABOUT:
				setIsAboutComponent(true);
				break;
			default:
				break;
		}
	};

	const closeSettingsHandler = () => {
		if (isAboutComponent) {
			setIsAboutComponent(false);
		}
		if (isEditComponent) {
			setIsEditComponent(false);
		}
		setIsSettings(false);
	};

	return (
		<>
			<SettingsButton onClick={() => setIsSettings(true)} />
			{isSettings && (
				<SettingsBox edit={isEditComponent} onClose={closeSettingsHandler}>
					{!isAboutComponent && !isEditComponent && (
						<ul>
							{isUserAuthor && (
								<>
									<Setting onClick={() => handleClick(DELETE)} red>
										Delete
									</Setting>
									<Setting onClick={() => handleClick(EDIT)}>Edit</Setting>
									<Setting onClick={() => handleClick(SWITCH_LIKE_COUNT)}>
										{hideLikesCount ? 'Show likes count' : 'Hide likes count'}
									</Setting>
									<Setting onClick={() => handleClick(SWITCH_COMMENTING)}>
										{commenting ? 'Turn off commenting' : 'Turn on commenting'}
									</Setting>
									<Setting onClick={() => handleClick(ARCHIVE)}>
										Archive
									</Setting>
								</>
							)}

							{!isUserAuthor && isUserFollowingAuthor && (
								<Setting onClick={() => handleClick(UNFOLLOW)} red>
									Unfollow
								</Setting>
							)}

							{!isUserAuthor && !isUserFollowingAuthor && (
								<Setting onClick={() => handleClick(FOLLOW)}>Follow</Setting>
							)}

							{!isUserAuthor && (
								<Setting onClick={() => handleClick(ABOUT)}>
									About this account
								</Setting>
							)}

							<Setting onClick={() => setIsSettings(false)}>Cancel</Setting>
						</ul>
					)}
					{isAboutComponent && (
						<AccountAbout userId={authorId} onClose={closeSettingsHandler} />
					)}
					{isEditComponent && (
						<EditPost
							userImageType={userImageType}
							userImage={userImage}
							images={images}
							authorName={authorName}
							onClose={closeSettingsHandler}
							postId={postId}
						/>
					)}
				</SettingsBox>
			)}
		</>
	);
};

export default PostSettings;
