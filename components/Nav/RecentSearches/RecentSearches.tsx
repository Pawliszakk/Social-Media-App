import { useEffect, useState } from 'react';
import classes from './RecentSearches.module.scss';
import RecentSearch from './RecentSearch';
import SearchedUsersSkeleton from '../SearchedUsers/SearchedUsersSkeleton';
import { clearRecentSearches } from '@/lib/actions/user/clearRecentSearches';
import ClearRecentModal from './ClearRecentModal';

interface RecentSearchesProps {
	onClose: () => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = (props) => {
	const [recentSearches, setRecentSearches] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isClearModal, setIsClearModal] = useState(false);

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

	const clearRecentHandler = () => {
		setRecentSearches([]);
		clearRecentSearches();
		setIsClearModal(false);
	};
	const showClearModal = () => setIsClearModal(true);
	const hideClearModal = () => setIsClearModal(false);

	return (
		<>
			<div className={classes.header}>
				<span className={classes.heading}>Recent</span>

				<button
					className={`${classes.clear} ${
						recentSearches.length > 0 ? classes.show : null
					}`}
					onClick={showClearModal}
				>
					Clear All
				</button>
			</div>

			<div className={classes.box}>
				{recentSearches.length === 0 && !isLoading && (
					<p>No recent searches.</p>
				)}
				{recentSearches.length === 0 && isLoading && <SearchedUsersSkeleton />}
				{recentSearches.length > 0 &&
					recentSearches.map((user: any) => (
						<RecentSearch
							onClose={props.onClose}
							key={user.id}
							onDeleteUser={deleteUserFromSearches}
							user={user}
						/>
					))}
			</div>
			{isClearModal && (
				<ClearRecentModal
					onClose={hideClearModal}
					onClear={clearRecentHandler}
				/>
			)}
		</>
	);
};

export default RecentSearches;
