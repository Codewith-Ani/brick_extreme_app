import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import { useForgotUserPasswordMutation } from '../../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const [forgotUserPassword, { isLoading, isSuccess, error }] =
		useForgotUserPasswordMutation();

	const { isAuthentiated } = useSelector((state) => state.auth);
	useEffect(() => {
		if (isAuthentiated) {
			navigate('/');
		}
		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			toast.success('Email sent, please check your inbox');
		}
	}, [error, isAuthentiated, isSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();
		forgotUserPassword({ email });
	};

	return (
		<UserLayout>
			<div className='flex flex-col items-center mt-5 px-4'>
				<div className='w-full max-w-md rounded-lg shadow-md p-4'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
						Forgot Password
					</h2>
					<form onSubmit={handleSubmit}>
						{/* Email Address Field */}
						<div className='mb-4'>
							<label className='block text-sm font-semibold mb-2'>
								Email Address
							</label>
							<input
								type='email'
								className='w-full border rounded-lg px-3 py-2 text-sm md:text-lg lg:text-xl'
								placeholder='Enter your email address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoComplete='email'
								required
							/>
						</div>

						{/* Submit Button */}
						<div className='flex justify-center'>
							<button
								type='submit'
								className='bg-black text-white px-6 py-2 rounded-lg hover:opacity-80'
								disabled={isLoading}
							>
								{isLoading ? 'Sending...' : 'Reset password'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</UserLayout>
	);
};

export default ForgotPassword;
