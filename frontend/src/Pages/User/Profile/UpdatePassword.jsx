import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserPasswordMutation } from '../../../redux/api/userApi';
import toast from 'react-hot-toast';

const UpdatePassword = () => {
	const { user } = useSelector((state) => state.auth);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();

	const [updatePassword, { isLoading, isSuccess, error }] =
		useUpdateUserPasswordMutation();

	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			toast.success('Password Updated');
			navigate('/me/profile');
		}
	}, [error, isSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			return toast.error('Passwords do not match!');
		}

		const userData = {
			oldPassword,
			password: newPassword,
		};

		updatePassword(userData);
	};

	return (
		<UserLayout>
			<div className='flex flex-col items-center mt-5 px-4'>
				<div className='w-full max-w-md rounded-lg shadow-md p-4'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
						Update Password
					</h2>
					<form onSubmit={handleSubmit}>
						{/* Hidden Username Field */}
						<div className='mb-4'>
							<label
								className='sr-only'
								htmlFor='username'
							>
								Username
							</label>
							<input
								type='text'
								id='username'
								name='username'
								value={user?.email || ''}
								autoComplete='username'
								className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl text-gray-900'
								readOnly
							/>
						</div>

						{/* Old Password */}
						<div className='mb-4'>
							<label className='block text-sm font-semibold mb-2'>
								Old Password
							</label>
							<input
								type='password'
								placeholder='Enter your old password'
								className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl text-gray-900'
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								autoComplete='current-password'
								required
							/>
						</div>

						{/* New Password */}
						<div className='mb-4'>
							<label className='block text-sm font-semibold mb-2'>
								New Password
							</label>
							<input
								type='password'
								className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl text-gray-900'
								placeholder='Enter your new password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								autoComplete='new-password'
								required
							/>
						</div>

						{/* Confirm New Password */}
						<div className='mb-4'>
							<label className='block text-sm font-semibold mb-2'>
								Confirm New Password
							</label>
							<input
								type='password'
								className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl text-gray-900'
								placeholder='Confirm your new password'
								value={confirmPassword}
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
								autoComplete='new-password'
								required
							/>
						</div>

						{/* Submit Button */}
						<div className='flex justify-center'>
							<button
								type='submit'
								className='bg-gray-800 text-white px-6 py-2 rounded-lg hover:opacity-80'
							>
								{isLoading ? 'Updating..' : 'Update Password'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</UserLayout>
	);
};

export default UpdatePassword;
