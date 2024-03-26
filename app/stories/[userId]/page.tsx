const StoriesPage = ({ params }: { params: { userId: string } }) => {
	const { userId } = params;
	return <div>{userId}</div>;
};

export default StoriesPage;
