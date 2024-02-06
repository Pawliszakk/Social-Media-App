'use client';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import classes from './SettingsButton.module.scss';
import Portal from '@/lib/Portal/Portal';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';

interface SettingsButtonProps {
	isUserFollowingAuthor: boolean;
	isUserAuthor: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({
	isUserAuthor,
	isUserFollowingAuthor,
}) => {
	const [isSettings, setIsSettings] = useState(false);

	const handleClick = (
		event: React.MouseEvent<HTMLLIElement | HTMLDivElement>
	) => {
		event.stopPropagation();
		console.log('test setings');
	};

	return (
		<>
			<button className={classes.button} onClick={() => setIsSettings(true)}>
				<BsThreeDots />
			</button>
			{isSettings && (
				<Portal>
					<Backdrop onClose={() => setIsSettings(false)}>
						<motion.div
							animate={{ scale: [1.5, 1], opacity: [0, 1] }}
							className={classes.settings}
						>
							<ul>
								{isUserAuthor && <li onClick={handleClick}>Delete</li>}
								{isUserAuthor && <li onClick={handleClick}>Edit</li>}
								{isUserAuthor && (
									<li onClick={handleClick}>Hide like count to others</li>
								)}
								{isUserAuthor && (
									<li onClick={handleClick}>Turn off commenting</li>
								)}

								{!isUserAuthor && isUserFollowingAuthor && (
									<li onClick={handleClick}>Unfollow</li>
								)}
								{!isUserAuthor && !isUserFollowingAuthor && (
									<li onClick={handleClick}>Follow</li>
								)}

								<li onClick={handleClick}>About this account</li>

								<li onClick={() => setIsSettings(false)}>Cancel</li>
							</ul>
						</motion.div>
					</Backdrop>
				</Portal>
			)}
		</>
	);
};

export default SettingsButton;
