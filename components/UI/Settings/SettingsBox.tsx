import Portal from '@/lib/Portal/Portal';
import classes from './SettingsBox.module.scss';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';

const SettingsBox = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => {
	return (
		<Portal>
			<Backdrop onClose={onClose}>
				<motion.div
					animate={{ scale: [1.5, 1], opacity: [0, 1] }}
					className={classes.settings}
				>
					{children}
				</motion.div>
			</Backdrop>
		</Portal>
	);
};

export default SettingsBox;
