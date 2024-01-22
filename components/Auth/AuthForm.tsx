import Link from 'next/link';
import SignupButtons from './Buttons/SignupButtons';
import classes from './AuthForm.module.scss';
import Login from './Forms/LoginForm';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
interface AuthFormProps {
	login?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ login }) => {
	return (
		<div className={classes.card}>
			<SignupButtons />

			{login ? (
				<>
					<LoginForm />
					<p>
						Don't have an account?
						<Link href="/auth/signup">Go to Signup page</Link>
					</p>
				</>
			) : (
				<>
					<SignupForm />
					<p>
						Already have an account?
						<Link href="/auth/login">Go to login page</Link>
					</p>
				</>
			)}
		</div>
	);
};

export default AuthForm;
