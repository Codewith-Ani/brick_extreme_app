import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import default_image from '../../../assets/default_product.png';
import { FaGreaterThan } from 'react-icons/fa';

const ProductItem = ({ product, location }) => {
	return (
		<>
			<div
				className={`${
					location === 'SearchModel' ? 'my-5 text-white' : ''
				}`}
			>
				<Link to={`/product/${product?._id}`}>
					<div
						className={`${
							location === 'SearchModel'
								? 'w-full flex gap-2  '
								: ''
						}`}
					>
						<img
							className={`${
								location === 'SearchModel'
									? 'h-[150px] w-[150px] '
									: ''
							}`}
							src={
								product?.images[0]
									? product?.images[0]?.url
									: default_image
							}
							alt={product?.name}
						/>
						<div className='py-3 flex justify-evenly flex-col items-start'>
							<h5>{product?.name}</h5>
							<div className='ratings mt-auto flex items-center'>
								<div className='flex'>
									<StarRatings
										rating={product?.ratings}
										starRatedColor='#ffb829'
										numberOfStars={5}
										starDimension='20'
										starSpacing='1px'
										name='ratings'
									/>
								</div>
								<span
									id='no_of_reviews'
									className='pt-2 ps-2'
								>
									({product?.number_of_reviews})
								</span>
							</div>
							<p className='card-text mt-2'>${product?.price}</p>
							<Link
								to={`/product/${product?._id}`}
								id='view_btn'
								className='my-4 flex items-center justify-center gap-1 text-xl '
							>
								View Details
								<FaGreaterThan />
							</Link>
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default ProductItem;
