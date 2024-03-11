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
import { switchCommenting } from '@/lib/actions/post/switchCommenting';
import { switchLiking } from '@/lib/actions/post/switchLiking';
interface PostSettingsProps {
	author: {
		id: string;
		name: string;
		image: string;
		imageType: string;
	};
	post: {
		id: string;
		commenting: boolean;
		hideLikesCount: boolean;
		images: string | string[];
	};
	user: { isUserFollowingAuthor: boolean; isUserAuthor: boolean };
}

const PostSettings: React.FC<PostSettingsProps> = ({ user, author, post }) => {
	const [isSettings, setIsSettings] = useState(false);
	const [isAboutComponent, setIsAboutComponent] = useState(false);
	const [isEditComponent, setIsEditComponent] = useState(false);

	const { isUserAuthor, isUserFollowingAuthor } = user;

	const handleClick = async (action: string) => {
		switch (action) {
			case DELETE:
				deletePost(post.id);
				break;
			case EDIT:
				setIsEditComponent(true);
				break;
			case SWITCH_LIKE_COUNT:
				await switchLiking(post.id);
				setIsSettings(false);
				break;
			case SWITCH_COMMENTING:
				await switchCommenting(post.id);
				setIsSettings(false);
				break;
			case ARCHIVE:
				archivePost(post.id);
				break;
			case UNFOLLOW:
				await unFollowUser(author.id);
				setIsSettings(false);
				break;
			case FOLLOW:
				await followUser(author.id);
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
										{post.hideLikesCount
											? 'Show likes count'
											: 'Hide likes count'}
									</Setting>
									<Setting onClick={() => handleClick(SWITCH_COMMENTING)}>
										{post.commenting
											? 'Turn off commenting'
											: 'Turn on commenting'}
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
						<AccountAbout userId={author.id} onClose={closeSettingsHandler} />
					)}
					{isEditComponent && (
						<EditPost
							userImageType={author.imageType}
							userImage={author.image}
							images={post.images}
							authorName={author.name}
							onClose={closeSettingsHandler}
							postId={post.id}
						/>
					)}
				</SettingsBox>
			)}
		</>
	);
};

export default PostSettings;
