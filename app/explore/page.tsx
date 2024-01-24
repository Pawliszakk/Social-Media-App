import { checkSession } from '@/lib/actions/utils/checkSession';

export default async function ExplorePage() {
	await checkSession();

	return <h1>Explore</h1>;
}
