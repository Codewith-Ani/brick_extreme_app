import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../../../redux/api/authApi';
import '../auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [login, { isLoading, error, data }] = useLoginMutation();
	const { isAuthenticated } = useSelector((state) => state.auth);

	console.log(
		'------------------------------------------------------------------------------'
	);
	console.log('IsAuthenticated- ', isAuthenticated);

	console.log(
		'------------------------------------------------------------------------------'
	);

	const navigate = useNavigate();

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

		const loginData = {
			email,
			password,
		};

		login(loginData);
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-500 to-blue-900 relative overflow-hidden'>
			<div className='relative w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl animate-fade-in-up'>
				<div className='flex justify-center mb-4 text-6xl'> Login </div>

				{/* Login Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-6'
				>
					{/* Email Input */}
					<div className='relative'>
						<input
							type='email'
							placeholder='Email'
							className='w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-blue-100 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					{/* Password Input */}
					<div className='relative'>
						<input
							type='password'
							placeholder='Password'
							className='w-full px-4 py-2 text-gray-900 placeholder-gray-500 bg-blue-100 border border-blue-400 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{/* Forgot Password Link */}
					<div className='text-right'>
						<Link
							to='/forgot_Password'
							className='text-sm font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800'
						>
							Forgot Password?
						</Link>
					</div>

					<button
						type='submit'
						className='w-full px-4 py-2 font-semibold text-white transition duration-500 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 hover:shadow-xl'
						disabled={isLoading}
					>
						{isLoading ? 'Loading... ' : 'Login'}
					</button>
				</form>

				{/* Additional Links */}
				<p className='text-sm text-center text-gray-500'>
					Don't have an account?
					<Link
						to='/register'
						className='font-semibold text-blue-600 ps-1 transition-colors duration-300 hover:text-blue-800'
					>
						Register Now
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
