'use server';

import { getServerSession } from 'next-auth';
import { permanentRedirect } from 'next/navigation';

export async function checkSession() {
	const session = await getServerSession();

	if (!session) {
		permanentRedirect('/auth/login');
	}
}
