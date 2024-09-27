import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Register = () => {
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const { name, email, password } = user;

	const [register, { isLoading, error, data }] = useRegisterMutation();
	const { isAuthenticated } = useSelector((state) => state.auth);

	// console.log('ATA:', data);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
		if (error) {
			toast.error(error?.data?.message);
		}
	}, [error, isAuthenticated]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const signUpData = {
			name,
			email,
			password,
		};

		register(signUpData);
	};

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 relative overflow-hidden'>
			<div className='relative w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl animate-fade-in-up'>
				<div className='flex justify-center mb-4 text-6xl'>
					Register
				</div>

				{/* Registration Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					{/* Username Input */}
					<div className='relative'>
						<input
							type='text'
							name='name'
							placeholder='Name'
							className='w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-blue-100 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105'
							value={name}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Email Input */}
					<div className='relative'>
						<input
							type='email'
							name='email'
							placeholder='Email'
							className='w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-blue-100 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105'
							value={email}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Password Input */}
					<div className='relative'>
						<input
							type='password'
							name='password'
							placeholder='Password'
							className='w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-blue-100 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105'
							value={password}
							onChange={handleChange}
							required
						/>
					</div>

					{/* Register Button */}
					<button
						type='submit'
						className='w-full px-4 py-2 font-semibold text-white transition duration-500 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 hover:shadow-xl'
						disabled={isLoading}
					>
						{isLoading ? 'Registering...' : 'Register'}
					</button>
				</form>

				{/* Additional Links */}
				<p className='text-sm text-center text-gray-500 mt-4'>
					Already have an account?{' '}
					<Link
						to='/login'
						className='font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800'
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
