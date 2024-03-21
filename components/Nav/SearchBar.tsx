import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import classes from './SearchBar.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { SlMagnifier } from 'react-icons/sl';
import { motion } from 'framer-motion';
import SearchedUser from './SearchedUser';
import Spinner from '../UI/Spinner';

interface SearchBarProps {
	onClose: () => void;
	actionBarRef: RefObject<HTMLDivElement>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [isFocus, setIsFocus] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [fetchedUsers, setFetchedUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const focusHandler = () => (isFocus ? setIsFocus(false) : setIsFocus(true));

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

console.log(fetchedUsers);

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
							placeholder={'Search...'}
							onFocus={focusHandler}
							onBlur={focusHandler}
							onChange={onInputChangeHandler}
							value={inputValue}
						/>
						<button type="reset">
							<IoMdCloseCircle />
						</button>
						<div className={classes.icon}>
							<SlMagnifier />
						</div>
					</form>
				</div>
			</div>
			<div className={classes.results}>
				{inputValue.trim().length === 0 ? (
					<span>Recent</span>
				) : (
					<span>Searched Users</span>
				)}
			</div>
			{!isLoading && (
				<div className={classes.users}>
					{!isLoading &&
						fetchedUsers.length >= 1 &&
						fetchedUsers?.map((user: any) => (
							<SearchedUser key={user.id} user={user} />
						))}
				</div>
			)}
			<div className={classes.loading}>{isLoading && <Spinner />}</div>
		</motion.div>
	);
};

export default SearchBar;
