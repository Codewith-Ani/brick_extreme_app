import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import { useResetUserPasswordMutation } from '../../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Fetch token from params
	const { token } = useParams();

	// API mutation hook for resetting password
	const [resetPassword, { isLoading, isSuccess, error }] =
		useResetUserPasswordMutation();

	// Authentication state check
	const { isAuthenticated } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	// Error or success handling using useEffect
	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
		if (isSuccess) {
			toast.success('Password reset successfully');
			navigate('/login');
		}
	}, [isSuccess, error, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();

		// Check if passwords match
		if (password !== confirmPassword) {
			return toast.error('Passwords do not match!');
		}

		// Token check before calling the API
		if (!token) {
			return toast.error('Invalid or missing token');
		}

		// API call to reset password
		const data = { password, confirmPassword };
		resetPassword({ token, body: data });
	};

	return (
		<div className='flex flex-col items-center mt-5 px-4'>
			<div className='w-full max-w-md rounded-lg shadow-md p-4'>
				<h2 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
					Reset Password
				</h2>
				<form onSubmit={handleSubmit}>
					{/* New Password Field */}
					<div className='mb-4'>
						<label className='block text-sm font-semibold mb-2'>
							New Password
						</label>
						<input
							type='password'
							className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl'
							placeholder='Enter your new password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete='new-password'
							required
						/>
					</div>

					{/* Confirm New Password Field */}
					<div className='mb-4'>
						<label className='block text-sm font-semibold mb-2'>
							Confirm New Password
						</label>
						<input
							type='password'
							className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl'
							placeholder='Confirm your new password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							autoComplete='new-password'
							required
						/>
					</div>

					{/* Submit Button */}
					<div className='flex justify-center'>
						<button
							type='submit'
							disabled={isLoading}
							className='bg-black text-white px-6 py-2 rounded-lg hover:opacity-80'
						>
							{isLoading
								? 'Resetting Password...'
								: 'Reset Password'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
