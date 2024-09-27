import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { FaLock } from 'react-icons/fa';

const Sidebar = () => {
	const menuItems = [
		{
			name: 'Profile',
			url: '/me/profile',
			icon: <FaUser size={20} />,
		},
		{
			name: 'Update Profile',
			url: '/me/update_profile',
			icon: <FaUserCog size={20} />,
		},
		{
			name: 'Update Avatar',
			url: '/me/upload_avatar',
			icon: <RxAvatar size={20} />,
		},
		{
			name: 'Update Password',
			url: '/me/update_password',
			icon: <FaLock size={20} />,
		},
	];

	const location = useLocation();
	const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

	const handleMenuItemClick = (menuItemUrl) => {
		setActiveMenuItem(menuItemUrl);
	};
	return (
		<div className='my-5'>
			{menuItems.map((menuItem, index) => (
				<Link
					key={index}
					to={menuItem.url}
					className={` ${
						activeMenuItem.includes(menuItem.url)
							? 'bg-white text-black'
							: 'text-white'
					} flex gap-5 items-center font-bold leading-4 text-sm lg:text-lg py-2 px-2 rounded-md hover:bg-gray-100 hover:text-black`}
					aria-current={
						activeMenuItem.includes(menuItem.url) ? 'true' : 'false'
					}
					onClick={() => {
						handleMenuItemClick(menuItem.url);
					}}
				>
					{menuItem.icon}
					{menuItem.name}
				</Link>
			))}
		</div>
	);
};

export default Sidebar;
