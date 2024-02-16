'use client';
import { useState } from 'react';
import classes from './EditImage.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';
import SettingsBox from '@/components/UI/Settings/SettingsBox';
import Setting from '@/components/UI/Settings/Setting';
import deleteCurrentAvatar from '@/lib/actions/user/deleteCurrentAvatar';

interface EditImageProps {
	userId: string;
	image: string;
	imageType: string;
	name: string | null | undefined;
}

const EditImage: React.FC<EditImageProps> = (props) => {
	const [isModal, setIsModal] = useState(false);

	const deletePhotoHandler = async () => {
		await deleteCurrentAvatar(props.userId);
		setIsModal(false);
	};

	return (
		<div className={classes.box}>
			<div className={classes.image} onClick={() => setIsModal(true)}>
				<ProfileImage
					image={props.image}
					imageType={props.imageType}
					name={props.name}
				/>
				<span>{props.name}</span>
			</div>

			<button onClick={() => setIsModal(true)}>Zmień zdjęcie</button>

			{isModal && (
				<SettingsBox onClose={() => setIsModal(false)}>
					<div className={classes.note}>
						<span>Change profile photo</span>
					</div>
					<ul>
						<Setting blue onClick={() => console.log('dodaj zdjecie')}>
							Add photo
						</Setting>
						<Setting red onClick={deletePhotoHandler}>
							Delete current photo
						</Setting>
						<Setting onClick={() => setIsModal(false)}>Cancel</Setting>
					</ul>
				</SettingsBox>
			)}
		</div>
	);
};

export default EditImage;
