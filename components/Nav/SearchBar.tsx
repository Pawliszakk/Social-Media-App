import { ChangeEvent, RefObject, useEffect, useState } from 'react';
import classes from './SearchBar.module.scss';
import { IoMdCloseCircle } from 'react-icons/io';
import { SlMagnifier } from 'react-icons/sl';
import { motion } from 'framer-motion';

interface SearchBarProps {
	onClose: () => void;
	actionBarRef: RefObject<HTMLDivElement>;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
	const [isFocus, setIsFocus] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const focusHandler = () => (isFocus ? setIsFocus(false) : setIsFocus(true));

	const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		if (inputValue && inputValue.trim().length !== 0) {
			console.log('git');
			//fetch Request
		}
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
				<span>Recent</span>

				<p>Wyniki wyszukiwan...</p>
			</div>
		</motion.div>
	);
};

export default SearchBar;
