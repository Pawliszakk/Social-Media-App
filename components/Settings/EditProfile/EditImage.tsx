'use client';
import { ChangeEvent, useRef, useState } from 'react';
import classes from './EditImage.module.scss';
import ProfileImage from '@/components/UI/User/ProfileImage';
import SettingsBox from '@/components/UI/Settings/SettingsBox';
import Setting from '@/components/UI/Settings/Setting';
import deleteCurrentAvatar from '@/lib/actions/user/deleteCurrentAvatar';
import { changeProfileImage } from '@/lib/actions/user/changeProfileImage';

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

	return (
		<>
			<div className={classes.box}>
				<div className={classes.image} onClick={() => setIsModal(true)}>
					<ProfileImage
						image={props.image}
						imageType={props.imageType}
						name={props.name}
					/>
					<span>{props.name}</span>
				</div>
				<button onClick={() => setIsModal(true)}>Change photo</button>

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
			</div>

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
		</>
	);
};

export default EditImage;
