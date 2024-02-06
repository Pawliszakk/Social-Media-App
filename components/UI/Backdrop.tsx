import { useEffect } from 'react';
import classes from './Backdrop.module.scss';
import { motion } from 'framer-motion';

interface BackdropProps {
	children: React.ReactNode;
	onClose: () => void;
}

const Backdrop: React.FC<BackdropProps> = (props) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<motion.div
			animate={{ opacity: [0, 1] }}
			onClick={props.onClose}
			className={classes.backdrop}
		>
			{props.children}
		</motion.div>
	);
};

export default Backdrop;
