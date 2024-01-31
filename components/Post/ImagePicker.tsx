'use client';

import { IoIosImages } from 'react-icons/io';
import classes from './ImagePicker.module.scss';
import { useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';

interface ImagePickerProps {
	label: string;
	name: string;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ label, name }) => {
	const [pickedImage, setPickedImage] = useState<string | null>();
	const imageInputRef = useRef<HTMLInputElement>(null)!;

	const handlePickClick = () => imageInputRef.current?.click();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];
		console.log(file);

		if (!file) {
			setPickedImage(null);
			return;
		}

		const fileReader = new FileReader();

		fileReader.onload = () => {
			const result = fileReader.result as string;
			setPickedImage(result);
		};

		fileReader.readAsDataURL(file);
	};

	return (
		<div className={classes.picker}>
			<div>
				<input
					type="file"
					id={name}
					accept="image/png, image/jpeg"
					name={name}
					ref={imageInputRef}
					onChange={handleImageChange}
				/>
				{!pickedImage && (
					<div className={classes.action}>
						{' '}
						<IoIosImages />
						<button onClick={handlePickClick} type="button">
							Select Image
						</button>
					</div>
				)}
			</div>
			{pickedImage && (
				<>
					{' '}
					<div className={classes.preview}>
						<Image
							src={pickedImage}
							alt="The image selected by the user"
							width={300}
							height={300}
						/>
					</div>
					<button type="submit">Share post</button>
				</>
			)}
		</div>
	);
};

export default ImagePicker;
