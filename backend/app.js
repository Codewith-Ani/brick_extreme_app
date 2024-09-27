import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
//Importing Routes
import productRoutes from './routes/products.route.js';
import authRoutes from './routes/auth.route.js';
import errorMiddleware from './middlewares/errors.middleware.js';
import orderRoutes from './routes/order.route.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const app = express();
// HANDLE UNCAUGHT ERROR

process.on('uncaughtException', (err) => {
	console.log(`ERROR: ${err}`);
	console.log('Shutting down due to uncaught error');
	process.exit(1);
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
	dotenv.config({ path: 'backend/config/config.env' });
}
// const PORT = process.env.PORT || 8000;

// Connecting to Database
connectDatabase();

//Handling Json
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// CORS Middleware
const corsOptions = {
	origin: ['http://localhost:5173'],
	credentials: true,
};

app.use(cors(corsOptions));

// Register Routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
	console.log(`ERROR: ${err}`);
	console.log('Shutting down server due to Unhandled Promise Rejection');

	server.close(() => {
		process.exit(1);
	});
});

// FOR HOSTING BACKEND WITH FRONTEND

if (process.env.NODE_ENV === 'PRODUCTION') {
	app.use(express.static(path.join(__dirname, '../frontend/dist')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
	});
}

// Middleware
app.use(errorMiddleware);

// App Listen
const server = app.listen(process.env.PORT, () => {
	console.log(
		`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}`
	);
});
