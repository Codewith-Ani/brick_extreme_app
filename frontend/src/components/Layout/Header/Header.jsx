import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUserAlt, FaShoppingBasket, FaTimes } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import { useLazyLogoutUserQuery } from '../../../redux/api/authApi';
import { useGetMeQuery } from '../../../redux/api/userApi';
import default_avatar from '../../../assets/default_avatar.jpg';

const Header = () => {
	const [isNavVisible, setNavVisible] = useState(false);
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [isSticky, setIsSticky] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const dropdownRef = useRef(null); // Reference to the dropdown element
	const searchPanelRef = useRef(null); // Reference to the search panel
	const location = useLocation();
	const navigate = useNavigate(); // Hook for navigation

	const [logout] = useLazyLogoutUserQuery();
	const { user } = useSelector((state) => state.auth);
	const { cartItems } = useSelector((state) => state.cart);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 200);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Close search panel when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchPanelRef.current &&
				!searchPanelRef.current.contains(event.target) &&
				!event.target.closest('.search-panel')
			) {
				setSearchOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [searchPanelRef]);

	const toggleNav = () => setNavVisible(!isNavVisible);
	const toggleSearch = () => setSearchOpen(!isSearchOpen);
	const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

	// Determine active link style
	const linkClasses = (path) => {
		const isActive = location.pathname === path;
		return `block my-2 text-lg md:text-xl text-center md:my-0 md:mx-4 ${
			isActive ? 'text-red-500 border-b-2 border-white' : 'text-white'
		}`;
	};

	const handleProfileClick = () => {
		navigate('/me/profile');
		setDropdownOpen(false);
	};

	const handleLogout = async () => {
		navigate('/');
		const result = await logout();
		if (result.isSuccess) {
			navigate(0);
		}
	};

	useGetMeQuery();

	return (
		<header
		className={`flex h-[88px] w-[100vw] justify-between items-center md:px-4 px-2 border-b border-gray-300 transition-all duration-300 ease-in-out ${
			isSticky
				? 'fixed w-full top-0 z-50 shadow-lg left-0'
				: 'relative'
		} w-auto`}  // Ensures full width on small screens, adjusts on larger screens
		style={{
			position: 'relative',
		}}
	>
			{/* Menu Icon (Burger Menu) */}
			<HiMiniBars3BottomLeft
				className='md:hidden text-xl text-white cursor-pointer'
				onClick={toggleNav}
			/>

			{/* Logo */}
			<Link
				to='/'
				className='flex items-center'
			>
				<div className='md:w-[300px] md:ml-[20px]  flex items-center justify-center'>
					<img
						src={logo}
						alt='Logo'
						className='w-[150px] z-40'
						style={{ position: 'absolute', top: '0px' }}
					/>
				</div>
			</Link>

			{/* Navigation Links */}
			<nav
				className={`fixed top-14 left-0 w-full bg-[rgba(82,73,73,1)] flex flex-col items-center p-4 transform ${
					isNavVisible ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 md:static md:flex-row md:transform-none md:p-0 md:w-auto md:bg-transparent md:items-center z-50`}
				style={{ zIndex: '9999' }} // Ensures menu is on top
			>
				<Link
					to='/'
					className={linkClasses('/')}
				>
					Home
				</Link>
				<Link
					to='/products'
					className={linkClasses('/products')}
				>
					Product
				</Link>
				<Link
					to='/contact'
					className={linkClasses('/contact')}
				>
					Contact
				</Link>
				<a
					href='/about'
					className={linkClasses('/about')}
				>
					About
				</a>
				{/* Dropdown and Account Icon Inside Burger Menu on XS Screens */}
				{isNavVisible && !user && (
					<Link
						to='/login'
						className='text-lg text-white mt-4'
					>
						Login
					</Link>
				)}
				{isNavVisible && user && (
					<div className='w-full flex flex-col items-center mt-4'>
						<div
							ref={dropdownRef}
							className='relative mb-4'
						>
							{/* Avatar and Dropdown Menu */}
							<div
								onClick={toggleDropdown}
								className='flex items-center md:hidden cursor-pointer'
							>
								<img
									src={
										user?.avatar
											? user?.avatar?.url
											: default_avatar
									}
									alt={`${user.name}'s profile`}
									className='w-12 h-12  rounded-full'
								/>
							</div>
							{/* Dropdown Menu */}
							{isDropdownOpen && (
								<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
									<button
										className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'
										onClick={handleProfileClick}
									>
										Profile
									</button>
									<button
										className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'
										onClick={handleLogout}
									>
										Logout
									</button>
								</div>
							)}
						</div>
					</div>
				)}
			</nav>

			{/* Right Section (User Icon, Cart Icon, Search Icon) */}
			<div className='flex items-center gap-5'>
				{user ? (
					<div
						ref={dropdownRef}
						className='relative hidden md:flex items-center cursor-pointer'
					>
						<img
							src={
								user?.avatar
									? user?.avatar?.url
									: default_avatar
							}
							alt={`${user.name}'s profile`}
							className='w-12 h-12 rounded-full'
							onClick={toggleDropdown}
						/>
						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10'>
								<button
									className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'
									onClick={handleProfileClick}
								>
									Profile
								</button>
								<button
									className='block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200'
									onClick={handleLogout}
								>
									Logout
								</button>
							</div>
						)}
					</div>
				) : (
					<Link
						to='/login'
						className='hidden md:block text-3xl text-white'
					>
						<FaUserAlt aria-label='Login' />
					</Link>
				)}
				<div className='relative'>
					<Link to='/cart'>
						<FaShoppingBasket
							className='text-3xl text-white'
							aria-label='Basket'
						/>
					</Link>
					<span className='absolute top-[-8px] right-[-10px] bg-red-600 text-white rounded-full px-2 text-xs'>
						{cartItems.reduce(
							(total, item) => total + item.quantity,
							0
						)}
					</span>
				</div>
				<FaSearch
					className='text-3xl text-white cursor-pointer'
					aria-label='Search'
					onClick={toggleSearch}
				/>
			</div>

			{/* Sliding Search Panel */}
			<div
				ref={searchPanelRef}
				className={`search-panel fixed top-0 right-0 h-full w-full md:w-[30%] bg-[rgba(41,38,38,0.89)] p-4 transform ${
					isSearchOpen ? 'translate-x-0' : 'translate-x-full'
				} transition-transform duration-300 ease-in-out`}
			>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-white text-2xl'>Search</h2>
					<button
						className='text-white'
						onClick={toggleSearch}
					>
						<FaTimes
							className='text-2xl'
							aria-label='Close Search'
						/>
					</button>
				</div>
				<Search />
			</div>
		</header>
	);
};

export default Header;
