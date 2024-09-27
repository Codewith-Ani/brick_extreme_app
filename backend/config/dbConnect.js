import mongoose from 'mongoose';

export const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_URI)
		.then((vConn) => {
			console.log(
				`MongoDb database connected with HOST ${vConn?.connection?.host}`
			);
		})
		.catch((err) => {
			console.log(`ERROR: ${err}`);
			console.log('Shutting down server due to MongoDb error');

			process.exit(1);
		});
};
