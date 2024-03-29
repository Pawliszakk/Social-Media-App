import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import classes from './SearchBar.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { SlMagnifier } from 'react-icons/sl';
import { motion } from 'framer-motion';
import RecentSearches from './RecentSearches/RecentSearches';
import SearchedUser from './SearchedUsers/SearchedUser';
import SearchedUsersSkeleton from './SearchedUsers/SearchedUsersSkeleton';

interface SearchBarProps {
	onClose?: () => void;
	actionBarRef?: RefObject<HTMLDivElement>;
	page?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [isFocus, setIsFocus] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [fetchedUsers, setFetchedUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const inputRef = useRef<HTMLInputElement>(null);

	const onInputChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		setInputValue(e.target.value);
		const res = await fetch(`/api/search/?search=${e.target.value}`);
		const fetchedUsers = await res.json();
		if (res.ok) {
			setFetchedUsers(fetchedUsers);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (props.actionBarRef && props.onClose) {
				if (
					props.actionBarRef.current &&
					e.target &&
					!props.actionBarRef.current.contains(e.target as Node)
				) {
					const elementId = (e.target as HTMLElement).id;
					if (elementId.includes('user-')) {
						return;
					}
					props.onClose();
				}
			}
		};
		if (props.actionBarRef && props.onClose) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const focusHandler = () => {
		setIsFocus((focus) => !focus);
	};

	const resetInputHandler = () => {
		setInputValue('');
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};
	const isInputEmpty = inputValue.trim().length === 0;

	return (
		<motion.div
			className={classes.box}
			initial={{ width: 0, opacity: 0 }}
			animate={{ width: 350, opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className={`${classes.search} ${props.page ? classes.page : null}`}>
				<span>Search</span>

				<div
					className={` ${classes.input} ${isFocus ? classes.focus : null} ${
						props.page ? classes.page : null
					}`}
				>
					<form>
						<input
							type="text"
							name="search"
							placeholder="Search..."
							onFocus={focusHandler}
							onBlur={focusHandler}
							onChange={onInputChangeHandler}
							ref={inputRef}
							value={inputValue}
						/>
						<button type="button" onClick={resetInputHandler}>
							<IoMdCloseCircle />
						</button>
						<div className={classes.icon}>
							<SlMagnifier />
						</div>
					</form>
				</div>
			</div>
			{isInputEmpty && (
				<RecentSearches page={props.page} onClose={props.onClose} />
			)}

			{!isInputEmpty && <span className={classes.heading}>Searched Users</span>}
			{!isLoading && !isInputEmpty && (
				<div className={classes.users}>
					{fetchedUsers.length >= 1 &&
						fetchedUsers?.map((user: any) => (
							<SearchedUser
								page={props.page}
								closeSearchBar={props.onClose}
								key={user.id}
								user={user}
							/>
						))}
					{fetchedUsers.length === 0 && <p>No results.</p>}
				</div>
			)}
			{isLoading && !isInputEmpty && (
				<div className={`${classes.users} ${props.page ? classes.page : null}`}>
					<SearchedUsersSkeleton />
				</div>
			)}
		</motion.div>
	);
};

export default SearchBar;
