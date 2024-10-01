import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../../redux/api/productsApi';
import { Link, useSearchParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import default_image from '../../assets/droid1.jpg';
import default_image2 from '../../assets/droid2.png';
import toast from 'react-hot-toast';
import Metadata from '../../components/Layout/Metadata/Metadata';
import CustomPagination from '../../components/Layout/CustomPagination/CustomPagination';
import Filters from '../../components/Layout/Filters/Filters';
import StarRatings from 'react-star-ratings';

const Products = () => {
	let [searchParams] = useSearchParams();
	const page = searchParams.get('page') || 1;
	const keyword = searchParams.get('keyword') || '';
	const min = searchParams.get('min');
	const max = searchParams.get('max');
	const category = searchParams.get('category');

	const params = { page, keyword };

	if (min) params.min = min;
	if (max) params.max = max;
	if (category) params.category = category;

	const { data, isLoading, error, isError } = useGetProductsQuery(params);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<Oval
					height={100}
					width={100}
					color='#4fa94d'
					ariaLabel='Loading'
					secondaryColor='#4fa94d'
					strokeWidth={2}
					strokeWidthSecondary={2}
				/>
			</div>
		);
	}

	return (
		<>
			<Metadata title={'Products - Buy Best Products Online'} />

			{/* Container with overflow hidden to prevent horizontal scrolling */}
			<div className='w-full overflow-hidden'>
				<div className='grid grid-cols-12 gap-2 px-4 py-2'>
					{/* Filter Section */}
					<div className='col-span-12 md:col-span-3 p-1'>
						<Filters />
					</div>

					{/* Products Section */}
					<div className='col-span-12 md:col-span-9 px-2'>
						<h1 className='text-2xl md:text-4xl font-extrabold text-gray-400 mb-6'>
							All Products
						</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
							{data?.products?.map((product, index) => {
								const discountPrice = (
									product.price * 0.9
								).toFixed(2); // Assuming a 10% discount
								/* const hoverImage =
									product?.images[1]?.url || default_image;
								const defaultImage =
									product?.images[0]?.url || default_image;
								 */
								const hoverImage = default_image;
								const defaultImage = default_image2;

								return (
									<Link
										key={index}
										to={`/product/${product?._id}`}
										className='relative overflow-hidden rounded-lg shadow-md shadow-blue-400 group cursor-pointer transition-all duration-300  *: hover:shadow-white hover:-translate-y-1'
									>
										{/* Image Section */}
										<div className='w-full aspect-square relative flex justify-center items-center'>
											<img
												className='absolute w-full aspect-square object-fill transition-opacity duration-300 ease-in-out group-hover:opacity-0'
												src={defaultImage}
												alt={product?.name}
											/>
											<img
												className='absolute w-full aspect-square object-contain transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'
												src={hoverImage}
												alt={`${product?.name} hover`}
											/>
										</div>

										{/* Details Section */}
										<div className='w-full p-2 bg-slate-800 text-gray-200 flex flex-col justify-center'>
											<h3 className='text-lg font-semibold truncate'>
												{product?.name}
											</h3>
											<p className='text-sm text-gray-200 truncate'>
												{product.description}
											</p>
											<div className='flex justify-between items-center mt-1'>
												<p className='text-lg font-bold text-red-400'>
													${discountPrice}
												</p>
												<div className='flex items-center gap-2'>
													<StarRatings
														starDimension='20px'
														starRatedColor='#d6a444'
														rating={
															Math.round(
																product.ratings *
																	2
															) / 2
														}
													/>
												</div>
											</div>
										</div>
									</Link>
								);
							})}
						</div>

						{/* Pagination Component */}
						<CustomPagination
							resPerPage={data?.resultPerPage}
							filteredProductsCount={data?.filteredProductCount}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Products;
