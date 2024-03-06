import { getTopUsers } from '@/lib/actions/user/getTopUsers';
import SuggestedUser from '@/components/Home/SuggestedUser';

const TopAccounts = async () => {
	const { userId, users } = await getTopUsers();
	return (
		<>
			{' '}
			{users.map(
				(user: {
					image: string;
					id: string;
					imageType: string;
					name: string;
					followers: number;
				}) => {
					return (
						<SuggestedUser
							key={user.id}
							id={user.id}
							image={user.image}
							imageType={user.imageType}
							name={user.name}
							userId={userId}
							followersLength={user.followers}
							followers
							button
						/>
					);
				}
			)}
		</>
	);
};

export default TopAccounts;
