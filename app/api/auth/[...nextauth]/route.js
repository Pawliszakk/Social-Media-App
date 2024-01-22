import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import { isUserInDatabase } from '@/lib/actions/login/isUserInDatabase';
import { createUser } from '@/lib/actions/login/createUser';

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
			name: 'Credentials',
			credentials: {
				email: {
					label: 'E-mail',
					type: 'email',
					placeholder: 'Enter your email address',
					required: true,
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password...',
					required: true,
				},
			},
			async authorize(credentials, req) {
				const { email, password } = credentials;
				console.log(`email: ${email} password: ${password}     (authorize)`);
				return false;
			},
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			const isUser = await isUserInDatabase(user.email);
			
			let isCreatedUser;
			if (!isUser) {
				isCreatedUser = await createUser(user, account.provider);
			}

			if (isUser || isCreatedUser) {
				const isAllowedToSignIn = true;
				if (isAllowedToSignIn) {
					return true;
				}
			}
		},

		async jwt({ token }) {
			return token;
		},
	},
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
