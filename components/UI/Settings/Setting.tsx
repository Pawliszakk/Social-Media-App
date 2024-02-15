'use client';
import { useState } from 'react';
import classes from './Setting.module.scss';
import Spinner from '@/components/UI/Spinner';
interface SettingProps {
	onClick: ((e: any) => Promise<void>) | (() => void);
	children: string;
	red?: boolean;
	blue?: boolean;
}

const Setting: React.FC<SettingProps> = (props) => {
	const [isLoading, setIsLoading] = useState(false);

	const settingClickHandler = (
		e: React.MouseEvent<HTMLLIElement | HTMLDivElement>
	) => {
		setIsLoading(true);
		props.onClick(e);
	};

	return (
		<li
			onClick={settingClickHandler}
			className={`${classes.setting} ${props.red ? classes.red : ''}  ${
				props.blue ? classes.blue : ''
			} ${isLoading ? classes.loading : ''}`}
		>
			{isLoading ? <Spinner className={classes.spinner} /> : props.children}
		</li>
	);
};

export default Setting;
