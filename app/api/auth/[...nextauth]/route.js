import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createUserByProvider } from '@/lib/actions/login/createUserByProvider';
import { isUserInDatabase } from '@/lib/actions/utils/isUserInDatabase';
import { loginUserByCredentials } from '@/lib/actions/login/loginUserByCredentials';
import { createUserByCredentials } from '@/lib/actions/login/createUserByCredentials';

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		CredentialsProvider({
			id: 'loginCredentials',
			name: 'login credentials',
			async authorize({ email, password }) {
				const user = await loginUserByCredentials(email, password);
				return user;
			},
		}),
		CredentialsProvider({
			id: 'signupCredentials',
			name: 'signup credentials',
			async authorize({ name, email, password }) {
				const user = await createUserByCredentials(name, email, password);
				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ user: userData, account }) {
			if (userData && account.type === 'credentials') {
				return true;
			}
			const user = await isUserInDatabase(userData.email);
			let isUserCreated = false;
			if (!user) {
				isUserCreated = await createUserByProvider(userData, account.provider);
			}

			if (user && user.provider !== account.provider) {
				console.log('zly provider');
				//HANDLE BAD CHOOSED PROVIDER FOR LOGGING IN FOR THAT ACCOUNT
			}

			if ((user && user.provider === account.provider) || isUserCreated) {
				return true;
			}
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
