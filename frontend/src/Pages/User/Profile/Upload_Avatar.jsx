import React, { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import { useNavigate } from 'react-router-dom';
import { useUploadUserAvatarMutation } from '../../../redux/api/userApi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import default_avatar from '../../../assets/default_avatar.jpg';

const Upload_Avatar = () => {
	const [avatar, setAvatar] = useState('');

	const { user } = useSelector((state) => state.auth);

	const [avatarPreview, setAvatarPreview] = useState(
		user?.avatar ? user?.avatar?.url : default_avatar
	);

	const navigate = useNavigate();

	const [upload_avatar, { isLoading, isSuccess, error }] =
		useUploadUserAvatarMutation();

	useEffect(() => {
		if (error) {
			toast.error(error?.data?.message);
		}

		if (isSuccess) {
			toast.success('Avatar Uploaded');
			navigate('/me/profile');
		}
	}, [error, isSuccess]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const userData = {
			avatar,
		};
		upload_avatar(userData);
	};

	const handleFileChange = (e) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	return (
		<UserLayout>
			<div className='flex justify-center items-center h-auto'>
				<div className='w-full max-w-lg p-4'>
					<form
						className='shadow-md rounded-lg p-6'
						onSubmit={handleSubmit}
					>
						<h2 className='text-4xl text-center font-semibold mb-6'>
							Upload Avatar
						</h2>

						{/* Avatar Preview */}
						<div className='flex justify-center mb-4'>
							<img
								src={avatarPreview}
								alt='Avatar Preview'
								className='w-60 h-60 rounded-full object-cover border border-gray-300'
							/>
						</div>

						{/* File Input */}
						<div className='mb-4'>
							<label
								htmlFor='file_input'
								className='block text-2xl font-medium mb-1'
							>
								Select File
							</label>
							<input
								type='file'
								id='file_input'
								accept='image/*'
								className='w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none'
								onChange={handleFileChange}
								aria-label='File input for avatar upload'
							/>
						</div>

						{/* Upload Button */}
						<button
							type='submit'
							className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors ${
								isLoading ? 'opacity-50 cursor-not-allowed' : ''
							}`}
							disabled={isLoading}
						>
							{isLoading ? 'Uploading...' : 'Upload'}
						</button>
					</form>
				</div>
			</div>
		</UserLayout>
	);
};

export default Upload_Avatar;
