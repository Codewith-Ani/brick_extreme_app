import ErrorHandler from '../Utils/ErrorHandler.js';

const errorMiddleware = (err, req, res, next) => {
	let error = {
		statusCode: err?.statusCode || 500,
		message: err?.message || 'Internal Server Error',
	};

	// HANDLE INVALID MONGOOOSE ID ERROR
	if (err.name === 'CastError') {
		const message = `Resource not found. Invalid ${err?.path}`;
		error = new ErrorHandler(message, 404);
	}

	// HANDLE VALIDATION ERROR
	if (err.name === 'ValidationError') {
		const message = Object.values(err.errors).map((value) => value.message);
		error = new ErrorHandler(message, 400);
	}

	// HANDLE DUPLICATE KEY ERROR
	if (err.code == 11000) {
		const message =
			'Email already present. Please log in or register with a new email address.';
		error = new ErrorHandler(message, 500);
	}

	// HANDLE WRONG JWT TOKEN ERROR
	if (err.name === 'JsonWebTokenError') {
		const message = 'Invalid Token. Please try again!';
		error = new ErrorHandler(message, 400);
	}

	// HANDLING EXPIRED JWT TOKEN

	if (err.name === 'TokenExpiredError') {
		const message = 'Token Expired. Please try again!';
		error = new ErrorHandler(message, 400);
	}

	if (process.env.NODE_ENV === 'DEVELOPMENT') {
		res.status(error.statusCode).json({
			message: error.message,
			error: err,
			stack: err?.stack,
		});
	} else if (process.env.NODE_ENV === 'PRODUCTION') {
		res.status(error.statusCode).json({
			message: error.message,
		});
	}
};

export default errorMiddleware;
