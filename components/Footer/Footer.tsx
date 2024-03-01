import classes from './Footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className={classes.footer}>
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
			<p>pawliszakDev {year} </p>
		</footer>
	);
};

export default Footer;
