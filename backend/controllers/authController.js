import catchAsyncErrorsMiddleware from '../middlewares/catchAsyncErrors.middleware.js';
import userModel from '../models/user.model.js';
import {
	delete_user_avatar_file,
	upload_user_avatar_file,
} from '../Utils/cloudnary.js';
import { getResetPasswordTemplate } from '../Utils/emailTemplates.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import sendEmail from '../Utils/sendEmail.js';
import sendToken from '../Utils/sendToken.js';
import crypto from 'crypto';

// REGISTER USER  =>  api/v1/register
export const registerUser = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const { name, email, password } = req.body;

		const user = await userModel.create({
			name,
			email,
			password,
		});

		sendToken(user, 201, res);
	}
);

// LOGIN USER  =>  api/v1/login

export const loginUser = catchAsyncErrorsMiddleware(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password)
		return next(new ErrorHandler('Please enter email and password', 400));

	// Find user in the database

	const user = await userModel.findOne({ email }).select('+password');

	if (!user) return next(new ErrorHandler('Invalid email or password', 401));

	// Check if password is correct
	const isPasswordMatched = await user.compareUserPassword(password);

	if (!isPasswordMatched)
		return next(new ErrorHandler('Invalid email or password', 401));

	sendToken(user, 200, res);
});

// LOG OUT USER => api/v1/logout

export const logoutUser = catchAsyncErrorsMiddleware(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		message: 'Logged Out',
	});
});

// FORGOT PASSWORD  =>  api/v1/password/forgot

export const forgotPassword = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		// Find user in the database

		const user = await userModel.findOne({ email: req.body.email });

		if (!user) {
			return next(new ErrorHandler('User not found', 404));
		}

		// GET RESET PASSWORD TOKEN
		const resetToken = user.getUserResetPasswordToken();

		await user.save();
		console.log(user);

		const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

		const message = getResetPasswordTemplate(user?.name, resetUrl);

		try {
			await sendEmail({
				email: user.email,
				subject: 'BrickDroid account password recovery',
				message,
			});
			res.status(200).json({
				message: `Email sent to ${user.email}`,
			});
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();
			return next(new ErrorHandler(error?.message, 500));
		}
	}
);

// RESET PASSWORD -  /api/v1/password/reset/:token

export const resetUserPassword = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		console.log('RESET PASSWORD START');

		const resetPasswordToken = crypto
			.createHash('sha256')
			.update(req.params.token)
			.digest('hex');

		const user = await userModel.findOne({
			resetPasswordToken,
			resetPasswordExpire: { $gt: Date.now() },
		});

		if (user) {
			console.log('IN RESET PASSWORD ');
		}

		if (!user) {
			return next(
				new ErrorHandler(
					'Password reset token is invalid or has been expired',
					400
				)
			);
		}

		if (req.body.password !== req.body.confirmPassword) {
			return next(
				new ErrorHandler('Password and Confirm Password should be same')
			);
		}

		// If All okay, then set password to new password

		user.password = req.body.password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save();

		sendToken(user, 200, res);
	}
);

// GET CURRENT USER PROFILE => /api/v1/me

export const getUserProfile = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const user = await userModel.findById(req?.user?._id);

		res.status(200).json({
			user,
		});
	}
);

// UPDATE USER PASSWORD
export const updateUserPassword = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const user = await userModel
			.findById(req?.user?._id)
			.select('+password');

		// Check previous password

		const isPasswordMatched = await user.compareUserPassword(
			req.body.oldPassword
		);

		if (!isPasswordMatched)
			return next(new ErrorHandler('Old Password is incorrect', 400));
		user.password = req.body.password;

		user.save();
		res.status(200).json({ success: true });
	}
);

// UPDATE USER INFORMATION => api/v1/me/update

export const updateUserInformation = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const newUserData = {
			name: req.body.name,
			email: req.body.email,
		};

		const user = await userModel.findByIdAndUpdate(
			req.user._id,
			newUserData,
			{ new: true }
		);

		res.status(200).json({ success: true, user });
	}
);

// GET ALL USERS FOR ADMIN => api/v1/admin/users

export const getAllUsers = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const users = await userModel.find();

		res.status(200).json({ success: true, users });
	}
);

// GET SPECIFIC USER DETAILS FOR ADMIN => api/v1/admin/users/:id

export const getUserDetails = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const user = await userModel.findById(req.params.id);

		if (!user) {
			return next(
				new ErrorHandler(
					`User not found with id: ${req.params.id}`,
					404
				)
			);
		}

		res.status(200).json({ success: true, user });
	}
);

// GET SPECIFIC USER DETAILS FOR ADMIN => api/v1/admin/users/:id

// UPDATE USER INFORMATION => api/v1/me/update

export const updateUserDetails_admin = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const newUserData = {
			name: req.body.name,
			email: req.body.email,
			role: req.body.role,
		};

		const user = await userModel.findByIdAndUpdate(
			req.params.id,
			newUserData,
			{ new: true }
		);

		res.status(200).json({ success: true, user });
	}
);

// DETlETE USER INFORMATION => api/v1/me/:id

export const deleteUserDetails_admin = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const user = await userModel.findById(req.params.id);

		if (!user) {
			return next(new ErrorHandler('User not found', 404));
		}

		await user.deleteOne();

		//TO DO - REMOVE USER IMAGE FROM CLOUDNARY

		res.status(200).json({ success: true });
	}
);

// UPLOAD USER AVATAR /api/v1/me/upload_avatar

export const upload_avatar = catchAsyncErrorsMiddleware(
	async (req, res, next) => {
		const avatar_response = await upload_user_avatar_file(
			req.body.avatar,
			'brickdroid-images/avatars'
		);

		//REMOVE PREVIOUS AVATAR
		if (req?.user?.avatar?.url) {
			await delete_user_avatar_file(req?.user?.avatar?.public_id);
		}

		const user = await userModel.findByIdAndUpdate(req?.user?._id, {
			avatar: avatar_response,
		});

		res.status(200).json({
			user,
		});
	}
);
