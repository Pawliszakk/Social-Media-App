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
					className={classes.input}
					type="file"
					id={name}
					accept="image/png, image/jpeg"
					name={name}
					ref={imageInputRef}
					onChange={handleImageChange}
				/>
				{!pickedImage && (
					<>
						{' '}
						<IoIosImages />
						<button onClick={handlePickClick} type="button">
							Select Image
						</button>
					</>
				)}
			</div>
			<div className={classes.preview}>
				{!pickedImage && <p>No image picked yet</p>}
				{pickedImage && (
					<div className={classes.image}>
						<Image
							src={pickedImage}
							alt="The image selected by the user"
							width={300}
							height={300}
						/>
						<button>X</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImagePicker;
