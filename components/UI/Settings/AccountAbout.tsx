import Image from 'next/image';
import classes from './AccountAbout.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '@/components/UI/Spinner';
import { FaCalendarAlt } from 'react-icons/fa';
import ProfileImage from '../User/ProfileImage';
interface AccountAboutProps {
	userId: string;
	onClose: () => void;
}

const AccountAbout: React.FC<AccountAboutProps> = ({ userId, onClose }) => {
	const [userData, setUserData] = useState<null | {
		_id: string;
		name: string;
		image: string;
		imageType: string;
		date: string;
	}>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const res = await fetch(`/api/user/?userId=${userId}`);
			const fetchedUserData = await res.json();
			if (res.ok) {
				setUserData(fetchedUserData);
			}
		};

		fetchUserData();
	}, [userId]);

	return (
		<div className={classes.about}>
			{userData ? (
				<>
					<div className={classes.header}>
						<p>About this account</p>
					</div>
					<div className={classes.content}>
						<ProfileImage
							image={userData.image}
							name={userData.name}
							imageType={userData.imageType}
						/>
						<span>{userData.name}</span>
						<p>
							To help keep our community authentic, we&apos;re showing
							information about accounts
						</p>

						<div className={classes.date}>
							<p>
								<FaCalendarAlt />
								{userData.date}
							</p>
						</div>
					</div>
					<div className={classes.close} onClick={onClose}>
						<p>Close</p>
					</div>
				</>
			) : (
				<Spinner className={classes.spinner} />
			)}
		</div>
	);
};

export default AccountAbout;
