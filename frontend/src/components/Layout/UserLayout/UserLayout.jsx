import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const UserLayout = ({ children }) => {
	return (
		<>
			<div className='mt-2 mb-4 py-4'>
				<h2 className='text-2xl md:text-5xl text-center font-semibold text-white'>
					User Settings
				</h2>
			</div>
			<div className='w-[90vw] mx-auto py-2 mb-5'>
				<div className='text-sm grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-5'>
					<div className='border border-gray-200 mb-5 md:mb-0 '>
						<Sidebar />
					</div>
					<div className='border border-white col-span-1 md:col-span-3  p-2 pt-3 text-2xl font-extrabold text-gray-300'>
						{children}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserLayout;
