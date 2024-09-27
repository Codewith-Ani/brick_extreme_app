import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../redux/api/productsApi';
import { IoClose } from 'react-icons/io5';

const Filters = () => {
	const [min, setMin] = useState('');
	const [max, setMax] = useState('');
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const [showFilters, setShowFilters] = useState(false);

	const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();

	useEffect(() => {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		if (min) newSearchParams.set('min', min);
		else newSearchParams.delete('min');

		if (max) newSearchParams.set('max', max);
		else newSearchParams.delete('max');

		if (selectedCategory && selectedCategory !== 'All') {
			newSearchParams.set('category', selectedCategory);
		} else {
			newSearchParams.delete('category');
		}

		setSearchParams(newSearchParams);
	}, [min, max, selectedCategory, setSearchParams]);

	const handleCategoryChange = (e) => {
		const category = e.target.value;
		if (category === 'All') {
			setSelectedCategory(null);
		} else {
			setSelectedCategory(category);
		}
	};

	const toggleFilterPanel = () => {
		setShowFilters(!showFilters);
	};

	if (isLoading) return <p>Loading categories...</p>;
	if (error) return <p>Error loading categories: {error.message}</p>;

	return (
		<div className='space-y-4'>
			<div>
				{/* Filter button */}
				<span
					className='flex items-center justify-center md:justify-start md:hidden text-white mb-3 p-2 bg-gray-800 rounded shadow hover:bg-gray-700 transition duration-300 cursor-pointer'
					onClick={toggleFilterPanel}
				>
					Filter
				</span>
			</div>

			{/* Filter Panel */}
			<div
				className={`${
					showFilters
						? 'fixed bg-white inset-0 z-50 w-[95%] p-1'
						: 'hidden md:block bg-white'
				} md:relative md:border md:border-gray-800 rounded-md shadow-md md:p-4 space-y-5`}
			>
				<div className='flex items-center justify-between mb-4 md:mb-6'>
					<h3 className='text-lg font-bold text-gray-800'>Filters</h3>
					<button
						className='text-gray-600 hover:text-gray-800 md:hidden'
						onClick={toggleFilterPanel}
					>
						<IoClose size={24} />
					</button>
				</div>

				<div className='space-y-5'>
					{/* Price Filter Section */}
					<div>
						<h5 className='text-md font-semibold mb-2 text-gray-700'>
							Price
						</h5>
						<div className='grid grid-cols-2 gap-3'>
							<input
								type='text'
								className='form-input w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
								placeholder='Min ($)'
								value={min}
								onChange={(e) => setMin(e.target.value)}
							/>
							<input
								type='text'
								className='form-input w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
								placeholder='Max ($)'
								value={max}
								onChange={(e) => setMax(e.target.value)}
							/>
						</div>
					</div>

					{/* Category Filter Section */}
					<div>
						<h5 className='text-md font-semibold mb-3 text-gray-700'>
							Category
						</h5>
						<div className='space-y-2'>
							{/* "All" Checkbox */}
							<div className='flex items-center'>
								<input
									className='form-checkbox text-blue-600 border-gray-300 rounded h-5 w-5'
									type='checkbox'
									value='All'
									checked={selectedCategory === null}
									onChange={handleCategoryChange}
								/>
								<label className='ml-2 text-gray-700'>
									All
								</label>
							</div>

							{/* Dynamically Render Categories */}
							{categoriesData?.categories.map((category) => (
								<div
									className='flex items-center'
									key={category}
								>
									<input
										className='form-checkbox text-blue-600 border-gray-300 rounded h-5 w-5 cursor-pointer'
										type='checkbox'
										value={category}
										checked={selectedCategory === category}
										onChange={handleCategoryChange}
									/>
									<label
										className='ml-2 text-gray-700 cursor-pointer'
										title={category}
									>
										{category}
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Filters;
