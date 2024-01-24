import { Metadata } from 'next';
import classes from './layout.module.scss';
import Image from 'next/image';
export const metadata: Metadata = {
	title: 'Login to app',
	description:
		'Login by your favourite provider or by your credentials to application',
};

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<div className={classes.box}>
				<Image
					src="/assets/ilustrations/authIlustration.JPG"
					width={600}
					height={600}
					alt="Ilustration of person trying to open big lock with a big key"
				/>

				{children}
			</div>
		</main>
	);
}
