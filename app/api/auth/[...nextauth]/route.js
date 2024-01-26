import NextAuth from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUserByCredentials } from '@/lib/actions/login/loginUserByCredentials';
import { createUserByCredentials } from '@/lib/actions/login/createUserByCredentials';
import { signUserByProvider } from '@/lib/actions/login/signUserByProvider';
import { deleteLoginCookies } from '@/lib/actions/utils/cookiesHandler';

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
			async authorize({ email, password }) {
				return await loginUserByCredentials(email, password);
			},
		}),
		CredentialsProvider({
			id: 'signupCredentials',
			async authorize({ name, email, password }) {
				return await createUserByCredentials(name, email, password);
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (user && account.type === 'credentials') {
				return true;
			}
			return await signUserByProvider(user, account.provider);
		},
		async redirect({ url }) {
			if (url === process.env.NEXTAUTH_URL) {
				deleteLoginCookies();
			}
			return '/auth/login';
		},
	},
	pages: {
		signIn: '/auth/login',
		signOut: '/auth/login',
		error: '/auth/login/',
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
