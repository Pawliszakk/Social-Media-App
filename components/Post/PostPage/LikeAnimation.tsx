import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import classes from './LikeAnimation.module.scss';

const LikeAnimation = () => {
	const randomAnimationNumber = Math.floor(
		Math.random() * (50 - -50 + 1) + -50
	);
	return (
		<motion.div
			animate={{
				scale: [0, 1.3, 1],
				rotate: [0, randomAnimationNumber, 0],
				y: [0, 0, 0, 0, 60, -400],
			}}
			className={classes.like}
		>
			<FaHeart />
		</motion.div>
	);
};

export default LikeAnimation;
