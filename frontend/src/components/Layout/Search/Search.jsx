import React, { useState, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import './Search.css';
import { useGetProductsQuery } from '../../../redux/api/productsApi';
import ProductItem from '../../Product/ProductItem/ProductItem';

const Search = () => {
	const [keyword, setKeyword] = useState('');
	const [debouncedKeyword, setDebouncedKeyword] = useState('');
	const [searchTriggered, setSearchTriggered] = useState(false);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedKeyword(keyword);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [keyword]);

	// Fetching products using RTK Query with debounced keyword
	const { data, isLoading, isError, error } = useGetProductsQuery({
		keyword: debouncedKeyword,
	});

	useEffect(() => {
		if (isError) {
			console.error(error?.data?.message); // Log error if any
		}
	}, [isError, error]);

	// Trigger search when the debounced keyword changes
	useEffect(() => {
		if (debouncedKeyword) {
			setSearchTriggered(true);
		} else {
			setSearchTriggered(false); // Reset search if input is cleared
		}
	}, [debouncedKeyword]);

	return (
		<>
			{/* Search Form */}
			<div className='w-full flex items-center gap-3 pe-4 border-b-gray-400 border-b-2'>
				<input
					type='text'
					id='search_field'
					aria-describedby='search_btn'
					className='text-[24px] text-white w-full fw-bold bg-transparent outline-none p-3'
					placeholder='Search for...'
					name='keyword'
					value={keyword}
					onChange={(e) => {
						setKeyword(e.target.value);
					}}
				/>
				<GoSearch
					className='text-white cursor-pointer'
					size={25}
				/>
			</div>

			{/* Show Loader when fetching */}
			{isLoading && <p className='text-white'>Loading...</p>}

			{/* Search Results */}
			{searchTriggered && data?.products?.length > 0 && (
				<div className='my-5'>
					<h2 className='text-white text-xl mb-2'>Search Results:</h2>
					{/* Scrollable container for search results with custom scrollbar */}
					<div className='flex flex-wrap space-y-1 pb-20 max-h-[75vh] overflow-y-auto custom-scrollbar'>
						{data.products.map((product) => (
							<ProductItem
								product={product}
								key={product._id}
								location='SearchModel'
							/>
						))}
					</div>
				</div>
			)}

			{/* No results found message */}
			{searchTriggered && !isLoading && data?.products?.length === 0 && (
				<p className='text-white'>No products found for "{keyword}"</p>
			)}
		</>
	);
};

export default Search;
