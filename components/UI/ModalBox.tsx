import Portal from '@/lib/Portal/Portal';
import classes from './ModalBox.module.scss';
import { motion } from 'framer-motion';
import Backdrop from '@/components/UI/Backdrop';

interface ModalBoxProps {
	children: React.ReactNode;
	onClose: () => void;
	edit?: boolean;
	classname?: string;
}

const ModalBox: React.FC<ModalBoxProps> = (props) => {
	const divClickHandler = (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
	) => {
		e.stopPropagation();
	};

	return (
		<Portal>
			<Backdrop onClose={props.onClose}>
				<motion.div
					animate={{ scale: [1.5, 1], opacity: [0, 1] }}
					className={`${classes.settings} ${props.edit ? classes.edit : ''} ${
						props.classname ? props.classname : null
					}`}
					onClick={divClickHandler}
				>
					{props.children}
				</motion.div>
			</Backdrop>
		</Portal>
	);
};

export default ModalBox;
