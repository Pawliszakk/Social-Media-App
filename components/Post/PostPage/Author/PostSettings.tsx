import Portal from '@/lib/Portal/Portal';
import classes from './PostSettings.module.scss';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';

interface PostSettingsProps {
	closeSettings: () => void;
	isUserAuthor: boolean;
}

const PostSettings: React.FC<PostSettingsProps> = (props) => {
	const handleClick = (
		event: React.MouseEvent<HTMLLIElement | HTMLDivElement>
	) => {
		event.stopPropagation();
	};

	return (
		<Portal>
			<Backdrop onClose={props.closeSettings}>
				<motion.div
					animate={{ scale: [1.5, 1], opacity: [0, 1] }}
					className={classes.settings}
				>
					<ul>
						<li onClick={handleClick}>Delete</li>
						<li onClick={handleClick}>Edit</li>
						<li onClick={handleClick}>Hide like count to others</li>
						<li onClick={handleClick}>Turn off commenting</li>
						<li onClick={() => props.closeSettings()}>Cancel</li>
					</ul>
				</motion.div>
			</Backdrop>
		</Portal>
	);
};

export default PostSettings;
