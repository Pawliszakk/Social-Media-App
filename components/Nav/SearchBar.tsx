import { ChangeEvent, RefObject, useEffect, useRef, useState } from 'react';
import classes from './SearchBar.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { SlMagnifier } from 'react-icons/sl';
import { motion } from 'framer-motion';
import SearchedUser from './SearchedUser';
import SearchedUsersSkeleton from './SearchedUsersSkeleton';

interface SearchBarProps {
	onClose: () => void;
	actionBarRef: RefObject<HTMLDivElement>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [isFocus, setIsFocus] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [fetchedUsers, setFetchedUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const focusHandler = () => setIsFocus((focus) => !focus);

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
			if (
				props.actionBarRef.current &&
				e.target &&
				!props.actionBarRef.current.contains(e.target as Node)
			) {
				props.onClose();
			}
		};
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	const isInputEmpty = inputValue.trim().length === 0;

	return (
		<motion.div
			className={classes.box}
			initial={{ width: 0, opacity: 0 }}
			animate={{ width: 350, opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className={classes.search}>
				<span>Search</span>

				<div className={` ${classes.input} ${isFocus ? classes.focus : null}`}>
					<form>
						<input
							type="text"
							name="search"
							placeholder="Search..."
							onFocus={focusHandler}
							onBlur={focusHandler}
							onChange={onInputChangeHandler}
							value={inputValue}
						/>
						<button type="button">
							<IoMdCloseCircle />
						</button>
						<div className={classes.icon}>
							<SlMagnifier />
						</div>
					</form>
				</div>
			</div>
			<div className={classes.results}>
				{isInputEmpty ? <span>Recent</span> : <span>Searched Users</span>}
			</div>
			{isInputEmpty && <div>Recent users</div>}
			{!isLoading && !isInputEmpty && (
				<div className={classes.users}>
					{fetchedUsers.length >= 1 &&
						fetchedUsers?.map((user: any) => (
							<SearchedUser key={user.id} user={user} />
						))}
				</div>
			)}
			{isLoading && !isInputEmpty && (
				<div className={classes.users}>
					<SearchedUsersSkeleton />
				</div>
			)}
		</motion.div>
	);
};

export default SearchBar;
