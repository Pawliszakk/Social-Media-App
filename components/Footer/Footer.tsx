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
			<a href="https://github.com/Pawliszakk/Social-Media-App">Help</a>
			<p>pawliszakDev {year} </p>
		</footer>
	);
};

export default Footer;
