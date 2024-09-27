import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';

const SearchModel = () => {
	const [keyword, setKeyword] = useState('');
	const [results, setResults] = useState([]); // State to store search results

	const submitHandler = (e) => {
		e.preventDefault();

		if (keyword.trim()) {
			// Simulate search results (replace with your search logic)
			const simulatedResults = [
				'Product 1',
				'Product 2',
				'Product 3',
				'Product 4',
			].filter((product) =>
				product.toLowerCase().includes(keyword.toLowerCase())
			);
			setResults(simulatedResults);
		} else {
			setResults([]); // Clear results if no keyword is entered
		}
	};

	return (
		<div>
			{/* Search Form */}
			<form
				onSubmit={submitHandler}
				className='flex items-center space-x-2'
			>
				<input
					type='text'
					id='search_field'
					className='w-full px-4 py-2 border border-gray-300 rounded focus:outline-none'
					placeholder='Enter Product Name...'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
				<button
					id='search_btn'
					className='p-2 bg-black text-white rounded'
					type='submit'
				>
					<GoSearch size={20} />
				</button>
			</form>

			{/* Display Search Results */}
			{results.length > 0 && (
				<div className='mt-4'>
					<ul className='list-disc pl-5'>
						{results.map((result, index) => (
							<li
								key={index}
								className='py-1'
							>
								{result}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default SearchModel;
