'use client';
import { ChangeEvent, useRef, useState } from 'react';
import { changeProfileImage } from '@/lib/actions/user/changeProfileImage';
import Image from 'next/image';
import classes from './LoggedUserImage.module.scss';
import Spinner from '../UI/Spinner';
import ProfileImage from '../UI/User/ProfileImage';
interface LoggedUserImageProps {
	image: string;
	name: string;
	imageType: string;
}

const LoggedUserImage: React.FC<LoggedUserImageProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const imageInputRef = useRef<HTMLInputElement>(null)!;
	const handlePickClick = () => imageInputRef.current?.click();

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		const file = e.target.files![0];
		if (!file) {
			setIsLoading(false);
			return;
		}
		const formData = new FormData();
		formData.append('image', file);
		await changeProfileImage(formData);
		setIsLoading(false);
	};

	return (
		<div className={classes.image} onClick={handlePickClick}>
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
			{isLoading && (
				<div className={classes.loading}>
					<Spinner />
				</div>
			)}
		</div>
	);
};

export default LoggedUserImage;
