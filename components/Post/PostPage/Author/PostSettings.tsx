import Portal from '@/lib/Portal/Portal';
import classes from './PostSettings.module.scss';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';

interface PostSettingsProps {
	closeSettings: () => void;
}

const PostSettings: React.FC<PostSettingsProps> = (props) => {
	return (
		<Portal>
			<Backdrop onClose={props.closeSettings}>
				<motion.div
					animate={{ scale: [1.5, 1], opacity: [0, 1] }}
					className={classes.settings}
				>
					<ul>
						<li>Opcja1</li>
						<li>Opcja2</li>
						<li>Opcja3</li>
						<li>Opcja3</li>
						<li onClick={props.closeSettings}>Cancel</li>
					</ul>
				</motion.div>
			</Backdrop>
		</Portal>
	);
};

export default PostSettings;
