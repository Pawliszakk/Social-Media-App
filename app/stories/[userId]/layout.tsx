import Link from 'next/link';
import classes from './layout.module.scss';
import { IoCloseOutline } from 'react-icons/io5';
export default async function StoriesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={classes.box}>
			<Link href="/" className={classes.logo}>
				Instagram
			</Link>
			<Link href="/" className={classes.close}>
				<IoCloseOutline />
			</Link>
			{children}
		</div>
	);
}
