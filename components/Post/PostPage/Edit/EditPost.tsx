'use client';

import Portal from '@/lib/Portal/Portal';
import classes from './EditPost.module.scss';
import Backdrop from '@/components/UI/Backdrop';

interface EditPostProps {
	onClose: () => void;
}

const EditPost = () => {
	return (
		<Portal>
			<Backdrop>
				<div className={classes.box}>123312312</div>
			</Backdrop>
		</Portal>
	);
};

export default EditPost;
