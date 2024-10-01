import React from 'react';
import { useGetLatestProductsQuery } from '../../redux/api/productsApi';
import { useNavigate } from 'react-router-dom';
import default_image from '../../assets/droid1.jpg';

const LatestProducts = () => {
	// Fetch products based on category 'Latest'
	const { data, isLoading, error, isError } = useGetLatestProductsQuery();
	const navigate = useNavigate();

	// Handle loading state
	if (isLoading)
		return <div className='p-4 text-center text-white'>Loading...</div>;

	// Handle error state
	if (isError)
		return (
			<div className='p-4 text-center text-red-500'>
				Error: {error.message}
			</div>
		);

	// Check if data exists
	if (!data || data.length === 0)
		return (
			<div className='p-4 text-center text-white'>No products found.</div>
		);

	// Filter the latest 4 products by creation time
	const latestProducts = [...data.products]
		.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		.slice(0, 4);

	// Handle Product click
	const handleProductClick = (product) => {
		return navigate(`/product/${product._id}`);
	};
	return (
		<div className='p-4 py-2'>
			<h2 className='text-3xl md:text-7xl text-gray-300 font-extrabold mb-4 text-start py-6 header-text'>
				Latest Products
			</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{latestProducts.map((product) => (
					<div
						key={product._id}
						className='rounded-lg bg-slate-800 overflow-hidden shadow-md shadow-blue-400 hover:shadow-white hover:translate-y-1 cursor-pointer'
						onClick={() => handleProductClick(product)}
					>
						<div className='w-full'>
							<img
								// src={product.images[0].url}
								src={default_image}
								alt={product.title}
								className='w-full'
							/>
						</div>
						<div className='p-4 h-[120px]'>
							<h3
								className='text-base md:text-lg font-semibold text-white overflow-hidden text-ellipsis whitespace-nowrap'
								title={product.name}
							>
								{product.name}
							</h3>
							<p className='text-sm md:text-base text-gray-300'>
								${product.price.toFixed(2)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LatestProducts;
