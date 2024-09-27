import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfileMutation } from '../../../redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UpdateProfile = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const navigate = useNavigate();
	const [updateProfile, { isLoading, error, isSuccess }] =
		useUpdateProfileMutation();

	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		if (user) {
			setName(user?.name);
			setEmail(user?.email);
		}
		if (error) {
			toast.error(error?.data?.message);
		}
		if (isSuccess) {
			toast.success('User Updated');
			navigate('/me/profile');
		}
	}, [user, error, isSuccess]);

	const submitHandler = (e) => {
		e.preventDefault();

		const userData = {
			name,
			email,
		};

		updateProfile(userData);
	};
	return (
		<UserLayout>
			<div className='flex justify-center items-center h-auto'>
				<div className='w-full max-w-lg p-4'>
					<form
						className='shadow-md rounded-lg p-6'
						onSubmit={submitHandler}
					>
						<h2 className='text-2xl font-semibold mb-6'>
							Update Profile
						</h2>

						{/* Name Field */}
						<div className='mb-4'>
							<label
								htmlFor='name_field'
								className='block text-lg font-medium mb-1'
							>
								Name
							</label>
							<input
								type='text'
								id='name_field'
								className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-600'
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>

						{/* Email Field */}
						<div className='mb-4'>
							<label
								htmlFor='email_field'
								className='block text-lg font-medium mb-1 '
							>
								Email
							</label>
							<input
								type='email'
								id='email_field'
								className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none text-gray-600'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						{/* Update Button */}
						<button
							type='submit'
							className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors'
							disabled={isLoading}
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</UserLayout>
	);
};

export default UpdateProfile;
