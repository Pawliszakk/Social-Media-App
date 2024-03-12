'use client';
import classes from './Privacy.module.scss';
import { privacyChange } from '@/lib/actions/user/settings/privacyChange';
import { useState } from 'react';
import Setting from '@/components/UI/Settings/Setting';
import { MdOutlinePhotoLibrary } from 'react-icons/md';
import styles from '@/components/UI/SwitchInput.module.scss';
import ModalBox from '@/components/UI/ModalBox';

interface PrivacyProps {
	isPrivate: boolean;
}

const Privacy: React.FC<PrivacyProps> = (props) => {
	const [isModal, setIsModal] = useState(false);
	const [message, setMessage] = useState<null | string>(null);

	const handlePrivacyChange = async () => {
		const res = await privacyChange(!props.isPrivate);
		setMessage(res.message);
		setIsModal(false);
	};

	return (
		<>
			<div className={classes.box}>
				<span>Private account</span>
				<div className={classes.input} onClick={() => setIsModal(true)}>
					<label htmlFor="privacy" className={styles.label}>
						<div className={styles.switch}>
							<input
								type="checkbox"
								name="privacy"
								id="privacy"
								disabled={true}
								checked={props.isPrivate}
							/>
							<span></span>
						</div>
					</label>
				</div>
				{isModal && (
					<ModalBox onClose={() => setIsModal(false)}>
						<div className={classes.note}>
							<p>
								<MdOutlinePhotoLibrary /> Only your followers will be able to
								see your photos and videos
							</p>
						</div>
						<ul>
							<Setting blue onClick={handlePrivacyChange}>
								{`Switch to ${props.isPrivate ? 'public' : 'private'}`}
							</Setting>
							<Setting red onClick={() => setIsModal(false)}>
								Cancel
							</Setting>
						</ul>
					</ModalBox>
				)}
			</div>

			{message && <p>{message}</p>}
		</>
	);
};

export default Privacy;
