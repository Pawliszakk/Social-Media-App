import Image from 'next/image';
import classes from './AccountAbout.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '@/components/UI/Spinner';
import { FaCalendarAlt } from 'react-icons/fa';
interface AccountAboutProps {
	userId: string;
	onClose: (e: React.MouseEvent<HTMLLIElement | HTMLDivElement>) => void;
}

const AccountAbout: React.FC<AccountAboutProps> = ({ userId, onClose }) => {
	const [userData, setUserData] = useState<null | {
		_id: string;
		name: string;
		image: string;
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
	}, []);

	return (
		<div className={classes.about}>
			{userData ? (
				<>
					<div className={classes.header}>
						<p>About this account</p>
					</div>
					<div className={classes.content}>
						<Image
							src={userData.image}
							width={70}
							height={70}
							alt={`${userData.name} avatar`}
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
