export const isCountersClickable = (
	followersLength: number,
	followingLength: number,
	isLoggedUserProfile: boolean,
	isPrivate: boolean,
	isBlocked: boolean,
	isUserFollowingProfile: boolean
) => {
	let isFollowersClickable =
		(followersLength > 0 || !isPrivate) &&
		(isLoggedUserProfile || isUserFollowingProfile) &&
		!isBlocked;

	if (followersLength === 0 && isPrivate) {
		isFollowersClickable = false;
	}

	if (followersLength === 0 && !isPrivate && !isUserFollowingProfile) {
		isFollowersClickable = false;
	}
	if (followersLength === 0) {
		isFollowersClickable = false;
	}
	let isFollowingClickable =
		(followingLength > 0 || !isPrivate) &&
		(isLoggedUserProfile || isUserFollowingProfile) &&
		!isBlocked;

	if (followingLength === 0 && isPrivate) {
		isFollowingClickable = false;
	}

	if (followingLength === 0 && !isPrivate && !isUserFollowingProfile) {
		isFollowingClickable = false;
	}
	if (followingLength === 0) {
		isFollowingClickable = false;
	}

	return { isFollowersClickable, isFollowingClickable };
};
