'use client';

import { useRef, useState, ChangeEvent } from 'react';
import Image from 'next/image';
import classes from './ImagePicker.module.scss';
import { IoIosImages } from 'react-icons/io';
import { useFormStatus } from 'react-dom';
import Spinner from '../UI/Spinner';

const ImagePicker = ({ name }: { name: string }) => {
	const [pickedImage, setPickedImage] = useState<string | null>();
	const { pending } = useFormStatus();
	const imageInputRef = useRef<HTMLInputElement>(null)!;

	const handlePickClick = () => imageInputRef.current?.click();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0];

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
						<IoIosImages />
						<button onClick={handlePickClick} type="button">
							Select Image
						</button>
					</div>
				)}
			</div>
			{pickedImage && (
				<>
					<div className={classes.preview}>
						<Image
							src={pickedImage}
							alt="The image selected by the user"
							width={300}
							height={300}
						/>
						<div className={classes.delete}>
							<button onClick={() => setPickedImage(null)}>X</button>
						</div>
					</div>
					{pending ? (
						<Spinner className={classes.spinner} />
					) : (
						<button type="submit">Share post</button>
					)}
				</>
			)}
		</div>
	);
};

export default ImagePicker;
