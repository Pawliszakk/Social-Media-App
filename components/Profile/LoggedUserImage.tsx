'use client';
import { changeProfileImage } from '@/lib/actions/user/changeProfileImage';
import Image from 'next/image';
import { ChangeEvent, useRef } from 'react';
import { useFormState } from 'react-dom';

interface LoggedUserImageProps {
	image: string;
	name: string;
	imageType: string;
}

const LoggedUserImage: React.FC<LoggedUserImageProps> = (props) => {
	const [state, formAction] = useFormState(changeProfileImage, { message: '' });
	const imageInputRef = useRef<HTMLInputElement>(null)!;
	const submitButtonRef = useRef<HTMLInputElement>(null)!;

	const handlePickClick = () => imageInputRef.current?.click();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		if (!file) {
			return;
		}
		submitButtonRef?.current?.click();
	};

	return (
		<>
			<Image
				src={
					props.imageType === 'provider'
						? props.image
						: `https://next-14-aws-oskar-bucket.s3.eu-central-1.amazonaws.com/${props.image}`
				}
				style={{ cursor: 'pointer' }}
				width={200}
				height={200}
				alt={`${props.name} Profile picture`}
				onClick={handlePickClick}
			/>
			<form action={formAction}>
				<input
					type="file"
					accept="image/png, image/jpeg"
					id="image"
					name="image"
					onChange={handleImageChange}
					ref={imageInputRef}
					style={{ display: 'none' }}
				/>
				<input
					type="submit"
					ref={submitButtonRef}
					style={{ display: 'none' }}
				/>
			</form>
		</>
	);
};

export default LoggedUserImage;
