'use client';

import classes from './LikesCount.module.scss';
import styles from '@/components/UI/SwitchInput.module.scss';
import { useState } from 'react';
import { switchShowLikes } from '@/lib/actions/user/settings/switchShowLikes';
import Spinner from '@/components/UI/Spinner';

interface LikesCountProps {
	userId: string;
	showLikes: boolean;
}

const LikesCount: React.FC<LikesCountProps> = (props) => {
	const [isShowLikes, setIsShowLikes] = useState(props.showLikes);
	const [isLoading, setIsLoading] = useState(false);

	const handleSwitchToggle = async (e: any) => {
		setIsLoading(true);
		let currentShowLikes = props.showLikes;
		try {
			currentShowLikes = await switchShowLikes();
		} catch (e) {
			setIsLoading(false);
		}
		setIsShowLikes(currentShowLikes);
		setIsLoading(false);
	};
	return (
		<div className={classes.box}>
			<span>Hide the numbers of likes and shares</span>
			<label htmlFor="theme" className={styles.label}>
				<div className={styles.switch}>
					{isLoading ? (
						<Spinner />
					) : (
						<>
							<input
								type="checkbox"
								name="theme"
								id="theme"
								onChange={handleSwitchToggle}
								checked={isShowLikes}
							/>
							<span></span>
						</>
					)}
				</div>
			</label>
		</div>
	);
};

export default LikesCount;
