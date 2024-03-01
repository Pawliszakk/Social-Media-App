'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editProfile } from '@/lib/actions/user/settings/editProfile';
import classes from './EditProfileForm.module.scss';

interface EditProfileFormProps {
	bio: string;
	sex: 'man' | 'woman' | 'other';
	website: string;
	name: string;
}

const EditProfileForm: React.FC<EditProfileFormProps> = (props) => {
	const [bio, setBio] = useState(props.bio);
	const [nick, setNick] = useState(props.name);
	const [sex, setSex] = useState(props.sex);
	const [website, setWebsite] = useState(props.website);

	const [state, formAction] = useFormState(editProfile, { message: '' });

	const [isFormTouched, setIsFormTouched] = useState(false);
	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const name = e.target.name;
		const value = e.target.value;

		if (name === 'bio') {
			setBio(value);
		} else if (name === 'sex') {
			setSex(value as 'man' | 'woman' | 'other');
		} else if (name === 'website') {
			setWebsite(value);
		} else if (name === 'name') {
			setNick(value);
		}

		setIsFormTouched(true);
	};
	return (
		<form className={classes.form} action={formAction}>
			<label htmlFor="name">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Please enter your new nickname"
				onChange={handleInputChange}
				value={nick}
			/>
			<label htmlFor="website">Website</label>
			<input
				type="text"
				name="website"
				id="website"
				placeholder="Please enter valid url to your website..."
				onChange={handleInputChange}
				value={website}
			/>
			<label htmlFor="bio">Biogram</label>
			<div className={classes.textarea}>
				<textarea
					name="bio"
					id="bio"
					placeholder="Please enter your biogram..."
					onChange={handleInputChange}
					value={bio}
				></textarea>
				<span>{bio.length} / 150</span>
			</div>
			<label htmlFor="sex">Sex</label>
			<select name="sex" id="sex" onChange={handleInputChange} value={sex}>
				<option value="man">Man</option>
				<option value="woman">Woman</option>
				<option value="other">Other</option>
			</select>
			<p>This will not be part of your public profile.</p>
			<button type="submit" disabled={!isFormTouched || bio.length >= 150}>
				Save Changes
			</button>

			{state.message && <p className={classes.result}>{state.message}</p>}
		</form>
	);
};

export default EditProfileForm;
