'use client';
import SearchBar from '@/components/Nav/SearchBar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage = () => {
	const [isMobile, setIsMobile] = useState(true);

	const router = useRouter();

	const handleResize = () => {
		const width = window.innerWidth;
		setIsMobile(width < 768);
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (!isMobile) {
		router.push('/');
	}

	return <SearchBar page />;
};

export default SearchPage;
