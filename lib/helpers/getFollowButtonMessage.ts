import {
	BLOCKING,
	FOLLOWING,
	NOTFOLLOWING,
	REQUESTED,
} from '../constants/followingStatus';

export const getProfileActionsButtonMessage = (followingStatus: string) => {
	switch (followingStatus) {
		case FOLLOWING:
			return 'Unfollow';
		case NOTFOLLOWING:
			return 'Follow';
		case REQUESTED:
			return 'Requested';
		case BLOCKING:
			return 'Unblock';
	}
};
export const getSuggestedButtonMessage = (followingStatus: string) => {
	switch (followingStatus) {
		case FOLLOWING:
			return 'Following';
		case NOTFOLLOWING:
			return 'Follow';
		case REQUESTED:
			return 'Requested';
	}
};
