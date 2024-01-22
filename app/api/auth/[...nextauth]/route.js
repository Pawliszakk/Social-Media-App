import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { isUserInDatabase } from '@/lib/actions/login/isUserInDatabase';
import { createUserByProvider } from '@/lib/actions/login/createUserByProvider';
import { createUserByCredentials } from '@/lib/actions/login/createUserByCredentials';
import { NULL } from 'sass';

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
			name: 'login Credentials',
			async authorize(credentials, req) {
				const { email, password } = credentials;

				console.log('Login');

				const user = { email, password };

				return true;
			},
		}),
		CredentialsProvider({
			id: 'signupCredentials',
			name: 'SecondCredentials',
			async authorize(credentials, req) {
				const { name, email, password } = credentials;

				console.log('signup');

				const user = { name, email, password };

				return user;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			// console.log(account);
			if (user && account.type === 'credentials') {
				return true;
			}
			const isUser = await isUserInDatabase(user.email);
			let isCreatedUser;
			if (!isUser) {
				isCreatedUser = await createUserByProvider(user, account.provider);
			}

			if ((isUser && isUser.provider === account.provider) || isCreatedUser) {
				return true;
			}
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
