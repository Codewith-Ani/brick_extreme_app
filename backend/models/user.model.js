import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter your name'],
			maxLength: [50, 'Your name cannot exceed 50 characters'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
			minLength: [6, 'Password should contain at least 6 character'],
			select: false,
		},
		avatar: {
			public_id: String,
			url: String,
		},
		role: {
			type: String,
			default: 'user',
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT Token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPRIES_TIME,
	});
};

//compare user password
userSchema.methods.compareUserPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

//Generate password reset token
userSchema.methods.getUserResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	//Hashing the reset Token
	this.resetPasswordToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// SET TOKEN EXPIRE TIME
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
	return resetToken;
};

export default mongoose.model('User', userSchema);
