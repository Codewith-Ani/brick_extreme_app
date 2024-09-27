import React from 'react';
import UserLayout from '../../../components/Layout/UserLayout/UserLayout';
import DefaultImg from '../../../assets/default_avatar.jpg';
import { useSelector } from 'react-redux';

const UserProfile = () => {
	const { user } = useSelector((state) => state.auth);

	return (
		<UserLayout>
			<div className='flex flex-col items-center mt-5 px-4'>
				{/* Avatar Section */}
				<div className='flex justify-center mb-5'>
					<figure className='w-32 h-32 md:w-40 md:h-40'>
						<img
							className='rounded-full object-cover w-full h-full'
							src={user?.avatar ? user?.avatar?.url : DefaultImg}
							alt={user?.name || 'User Avatar'}
						/>
					</figure>
				</div>

				{/* User Information in Tabular Format Using Divs */}
				<div className='w-full max-w-md  rounded-lg shadow-md p-4'>
					<div className='flex flex-wrap border-b py-2'>
						<div className='w-full md:w-1/2 font-semibold text-left'>
							Full Name
						</div>
						<div className='w-full md:w-1/2 text-sm md:text-lg lg:text-2xl'>
							{user?.name || 'N/A'}
						</div>
					</div>
					<div className='flex flex-wrap border-b py-2'>
						<div className='w-full md:w-1/2 font-semibold text-left'>
							Email Address
						</div>
						<div className='w-full md:w-1/2 text-sm  md:text-lg lg:text-2xl text-wrap'>
							{user?.email || 'N/A'}
						</div>
					</div>
					<div className='flex flex-wrap py-2'>
						<div className='w-full md:w-1/2 font-semibold text-left'>
							Joined on
						</div>
						<div className='w-full md:w-1/2 text-sm md:text-lg lg:text-xl'>
							{user?.createdAt
								? new Date(user?.createdAt).toDateString()
								: 'N/A'}
						</div>
					</div>
				</div>
			</div>
		</UserLayout>
	);
};

export default UserProfile;
