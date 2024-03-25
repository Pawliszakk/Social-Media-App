import { getSuggestedUsers } from '@/lib/actions/user/get/getSuggestedUsers';
import SuggestedUser from '@/components/Home/SuggestedUser';

const ExplorePeoplePage = async () => {
	const { userId, users } = await getSuggestedUsers(50);

	return (
		<>
			{users.map(
				(user: {
					image: string;
					id: string;
					imageType: string;
					name: string;
				}) => {
					return (
						<SuggestedUser
							key={user.id}
							id={user.id}
							image={user.image}
							imageType={user.imageType}
							name={user.name}
							userId={userId}
							button
						/>
					);
				}
			)}
		</>
	);
};

export default ExplorePeoplePage;
