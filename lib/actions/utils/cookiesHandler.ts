'use server';

import { cookies } from 'next/headers';

interface User {
	_id: string;
	email: string;
	name: string;
	image: string;
	sex: string;
	private: string;
	date: string;
	theme: string;
	provider: string;
}

export async function setLoginCookies(user: User) {
	cookies().set('userId', user._id);
	cookies().set('email', user.email);
	cookies().set('name', user.name);
	cookies().set('image', user.image);
	cookies().set('sex', user.sex);
	cookies().set('private', user.private);
	cookies().set('date', user.date);
	cookies().set('theme', user.theme);
	cookies().set('provider', user.provider);
}

export async function deleteLoginCookies() {
	cookies().delete('userId');
	cookies().delete('email');
	cookies().delete('name');
	cookies().delete('image');
	cookies().delete('sex');
	cookies().delete('private');
	cookies().delete('date');
	cookies().delete('theme');
	cookies().delete('provider');
}
