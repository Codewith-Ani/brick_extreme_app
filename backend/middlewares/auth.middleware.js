import userModel from '../models/user.model.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import catchAsyncErrorsMiddleware from './catchAsyncErrors.middleware.js';
import jwt from 'jsonwebtoken';

export const isAuthenticatedUser = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const { token } = req.cookies;
		console.log('COOKIES:', req.cookies);

		console.log('Token : ', token);

		if (!token)
			return next(
				new ErrorHandler('Login first to access this page', 401)
			);

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await userModel.findById(decoded.id);

		next();
	}
);

// AUTHORIZE USER ROLES

export const authorizeRoles = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new ErrorHandler(
					`${req.user.role.replace(/\b\w/g, (l) =>
						l.toUpperCase()
					)} is not allowed to access this resource`,
					403
				)
			);
		}

		next();
	};
};
