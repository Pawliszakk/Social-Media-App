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
			name: 'login credentials',
			async authorize(credentials, req) {
				const { email, password } = credentials;

				//LOGIC TO SIGNUP USER WITH CREDENTIALS

				return false;
			},
		}),
		CredentialsProvider({
			id: 'signupCredentials',
			name: 'signup credentials',
			async authorize(credentials, req) {
				const { name, email, password } = credentials;

				//LOGIC TO SIGNUP USER WITH CREDENTIALS

				return false;
			},
		}),
	],
	callbacks: {
		async signIn({ user: userData, account }) {
			if (userData && account.type === 'credentials') {
				return true;
			}
			const user = await isUserInDatabase(userData.email);

			if (user.provider !== account.provider) {
				console.log('zly provider');
				//HANDLE BAD CHOOSED PROVIDER FOR LOGGING IN FOR THAT ACCOUNT
			}

			let isUserCreated;
			if (!user) {
				isUserCreated = await createUserByProvider(user, account.provider);
			}
			if ((user && user.provider === account.provider) || isUserCreated) {
				return true;
			}
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
