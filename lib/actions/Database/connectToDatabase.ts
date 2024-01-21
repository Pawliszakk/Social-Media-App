import mongoose from 'mongoose';

export const connectToDatabase = async () => {
	const URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fvub0dj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
	let db;
	try {
		db = await mongoose.connect(URL);
	} catch (err) {
		throw new Error('Connecting to database failed');
	}
	return db;
};
