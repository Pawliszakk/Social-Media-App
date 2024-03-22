import { useEffect, useState } from 'react';
import classes from './RecentSearches.module.scss';
import RecentSearch from './RecentSearch';
import SearchedUsersSkeleton from '../SearchedUsers/SearchedUsersSkeleton';

const RecentSearches = () => {
	const [recentSearches, setRecentSearches] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchRecentSearchesHandler = async () => {
			setIsLoading(true);
			const res = await fetch('/api/search/recent');
			const fetchedRecentSearches = await res.json();
			if (res.ok) {
				setRecentSearches(fetchedRecentSearches);
			} else {
				setRecentSearches([]);
			}
			setIsLoading(false);
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
		<>
			<span className={classes.heading}>Recent</span>

			<div className={classes.box}>
				{recentSearches.length === 0 && !isLoading && (
					<p>No recent searches.</p>
				)}
				{recentSearches.length === 0 && isLoading && <SearchedUsersSkeleton />}
				{recentSearches.length > 0 &&
					recentSearches.map((user: any) => (
						<RecentSearch
							key={user.id}
							onDeleteUser={deleteUserFromSearches}
							user={user}
						/>
					))}
			</div>
		</>
	);
};

export default RecentSearches;
