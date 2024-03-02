'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { editProfile } from '@/lib/actions/user/settings/editProfile';
import classes from './EditProfileForm.module.scss';
import SwitchInput from '@/components/UI/SwitchInput';

interface EditProfileFormProps {
	bio: string;
	sex: 'man' | 'woman' | 'other';
	website: string;
	name: string;
	showInSuggestions: boolean;
}

const EditProfileForm: React.FC<EditProfileFormProps> = (props) => {
	const [state, formAction] = useFormState(editProfile, { message: '' });
	const [bio, setBio] = useState(props.bio);
	const [nick, setNick] = useState(props.name);
	const [sex, setSex] = useState(props.sex);
	const [website, setWebsite] = useState(props.website);
	const [showInSuggestions, setShowInSuggestions] = useState(
		props.showInSuggestions
	);

	const [isFormTouched, setIsFormTouched] = useState(false);
	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const name = e.target.name;
		const value = e.target.value;

		switch (name) {
			case 'bio':
				setBio(value);
				break;
			case 'sex':
				setSex(value as 'man' | 'woman' | 'other');
				break;
			case 'website':
				setWebsite(value);
				break;
			case 'name':
				setNick(value);
				break;
			default:
				break;
		}

		setIsFormTouched(true);
	};

	const handleToggleChange = (isChecked: boolean) => {
		setShowInSuggestions(isChecked);
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

			<label htmlFor="showInSuggestions">
				Show account proposals in profiles
			</label>

			<div className={classes.suggestions}>
				<div>
					<h3>Show account proposals in profiles</h3>
					<p>
						Determine whether other people can see suggestions for similar
						accounts in your profile and whether your account can be suggested
						in other profiles.
					</p>
				</div>
				<SwitchInput
					label=""
					name="showInSuggestions"
					onToggle={handleToggleChange}
					isChecked={showInSuggestions}
				/>
			</div>

			<button type="submit" disabled={!isFormTouched || bio.length >= 150}>
				Save Changes
			</button>

			{state.message && <p className={classes.result}>{state.message}</p>}
		</form>
	);
};

export default EditProfileForm;
