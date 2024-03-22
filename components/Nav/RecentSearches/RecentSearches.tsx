import { useEffect, useState } from 'react';
import classes from './RecentSearches.module.scss';
import RecentSearch from './RecentSearch';

const RecentSearches = () => {
	const [recentSearches, setRecentSearches] = useState([]);

	useEffect(() => {
		const fetchRecentSearchesHandler = async () => {
			const res = await fetch('/api/search/recent');
			const fetchedRecentSearches = await res.json();
			if (res.ok) {
				setRecentSearches(fetchedRecentSearches);
			} else {
				setRecentSearches([]);
			}
		};
		fetchRecentSearchesHandler();
	}, []);

	const deleteUserFromSearches = (userId: string) => {
		const updatedRecentSearches = recentSearches.filter(
			(recentSearch: any) => recentSearch.id !== userId
		);
		setRecentSearches(updatedRecentSearches);
	};

	return (
		<div className={classes.box}>
			{recentSearches.length === 0 && <p>No recent searches.</p>}
			{recentSearches.length > 0 &&
				recentSearches.map((user: any) => (
					<RecentSearch key={user.id} onDeleteUser={deleteUserFromSearches} user={user} />
				))}
		</div>
	);
};

export default RecentSearches;
