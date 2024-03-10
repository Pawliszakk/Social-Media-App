'use client';
import { ChangeEvent, useRef, useState } from 'react';
import { changeProfileImage } from '@/lib/actions/user/changeProfileImage';
import classes from './LoggedUserImage.module.scss';
import ProfileImage from '../UI/User/ProfileImage';
import SettingsBox from '../UI/Settings/SettingsBox';
import Setting from '../UI/Settings/Setting';
import deleteCurrentAvatar from '@/lib/actions/user/deleteCurrentAvatar';
interface LoggedUserImageProps {
	image: string;
	name: string;
	imageType: string;
	userId: string;
}

const LoggedUserImage: React.FC<LoggedUserImageProps> = (props) => {
	const [isModal, setIsModal] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	const imageInputRef = useRef<HTMLInputElement>(null)!;
	const handlePickClick = () => imageInputRef.current?.click();

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (!file) {
			setIsModal(false);
			return;
		}
		const formData = new FormData();
		formData.append('image', file);
		await changeProfileImage(formData);
		setIsModal(false);
	};

	const deletePhotoHandler = async () => {
		await deleteCurrentAvatar();
		setIsModal(false);
	};

	return (
		<div className={classes.image} onClick={() => setIsModal(true)}>
			<ProfileImage
				image={props.image}
				name={props.name}
				imageType={props.imageType}
				profile
			/>
			<form>
				<input
					type="file"
					accept="image/png, image/jpeg"
					id="image"
					name="image"
					onChange={handleImageChange}
					ref={imageInputRef}
				/>
			</form>
			{isModal && (
				<SettingsBox onClose={() => setIsModal(false)}>
					<div className={classes.note}>
						<span>Change profile photo</span>
					</div>
					<ul>
						<Setting blue onClick={handlePickClick}>
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

export default LoggedUserImage;
