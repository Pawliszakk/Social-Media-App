import classes from './Footer.module.scss';

interface FooterProps {
	aside?: boolean;
}

const Footer: React.FC<FooterProps> = (props) => {
	const year = new Date().getFullYear();

	return (
		<footer
			className={`${classes.footer} ${props.aside ? classes.aside : null}`}
		>
			<a href="https://pawliszakdev.com" target="_blank" rel="noopener">
				Author
			</a>
			<a
				href="https://github.com/Pawliszakk/Social-Media-App"
				target="_blank"
				rel="noopener"
			>
				Github Repo
			</a>
			<a href="https://github.com/Pawliszakk/Social-Media-App" target="_blank">
				Help
			</a>
			<a href="https://todo-app-full-stack-dun.vercel.app/" target="_blank">
				Task Pro App
			</a>
			<p>&copy; pawliszakDev {year} </p>
		</footer>
	);
};

export default Footer;
