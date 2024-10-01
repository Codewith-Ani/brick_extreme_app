import React, { useEffect, useState } from 'react';

import default_image from '../../../assets/droid1.jpg';
import default_image2 from '../../../assets/droid2.png';
import { useGetProductsDetailsQuery } from '../../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader/Loader';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem } from '../../../redux/features/cartSlice';

const ProductDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { data, isLoading, isError, error } = useGetProductsDetailsQuery(id);
	const product = data?.product;
	const cartItems = useSelector((state) => state.cart.cartItems); // Access cart items from state

	const [activeImage, setActiveImage] = useState('');
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setActiveImage(product?.images?.[0]?.url || default_image);
	}, [product]);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	const handleQuantityChange = (delta) => {
		setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
	};

	if (isLoading) return <Loader />;

	const setItemToCart = () => {
		const cartItem = {
			product: product?._id,
			name: product?.name,
			price: product?.price,
			image: product?.images?.[0]?.url,
			stock: product?.stock,
			quantity,
		};

		// Find the item in the cart
		const existingItem = cartItems.find(
			(i) => i.product === cartItem.product
		);

		// Check if the total quantity exceeds the available stock
		const totalQuantityInCart = existingItem
			? existingItem.quantity + quantity
			: quantity;

		if (totalQuantityInCart > product?.stock) {
			toast.error('Cannot add more than available stock.');
			return;
		}

		// Dispatch action to add/update the cart
		dispatch(setCartItem(cartItem));
	};

	return (
		<div className='flex flex-col p-2 my-2 min-h-screen text-white'>
			<div className='flex flex-col md:flex-row justify-evenly'>
				{/* Thumbnail Images */}
				<div className='flex flex-col-reverse md:flex-row md:w-[50%] max-h-[80vh]'>
					<div className='flex p-2 flex-row md:flex-col w-[25%] relative bg-white overflow-y-scroll gap-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
						{product?.images?.map((img, index) => (
							<img
								className={`w-[100%] object-fill aspect-square rounded-md cursor-pointer ${
									img.url === activeImage
										? 'border-black'
										: 'border-gray-300'
								} hover:border-black`}
								key={index}
								src={default_image}
								alt={`Thumbnail ${index + 1}`}
								onClick={() =>
									setActiveImage(img.url || default_image)
								}
							/>
						))}
					</div>

					{/* Main Image */}
					<div className='flex-1   flex items-center justify-center h-[80vh] mx-4'>
						<img
							className='w-full h-full'
							src={default_image2}
							alt={product?.name || 'Product Image'}
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className='opacity-1 flex-1 px-2 '>
					<h1 className='text-lg md:text-4xl font-bold mb-2'>
						{product?.name}
					</h1>
					<p className='mb-2'>Product ID: {product?._id}</p>
					<div className='flex items-center mb-2'>
						<StarRatings
							rating={product?.ratings || 0}
							starRatedColor='#ffb829'
							numberOfStars={5}
							name='rating'
							starDimension='20px'
							starSpacing='1px'
						/>
						<span className='ml-2'>
							({product?.number_of_reviews} Reviews)
						</span>
					</div>
					<p className='text-xl font-semibold text-red-500 mb-2'>
						${product?.price}
					</p>

					{/* Quantity Selector */}
					<div className='flex items-center mb-2'>
						<button
							onClick={() => handleQuantityChange(-1)}
							className={`px-4 py-2 rounded-lg text-lg ${
								quantity === 1
									? 'bg-gray-500 cursor-not-allowed'
									: 'bg-gray-900 hover:bg-gray-700'
							} text-white`}
							aria-label='Decrease Quantity'
						>
							-
						</button>
						<span className='text-white px-5 py-2 text-lg bg-gray-800 rounded-lg mx-1'>
							{product?.stock > 0 ? quantity : 0}
						</span>
						<button
							onClick={() => handleQuantityChange(1)}
							className={`px-4 py-2 rounded-lg text-lg ${
								quantity === product?.stock
									? 'bg-gray-500 cursor-not-allowed'
									: 'bg-gray-900 hover:bg-gray-700'
							} text-white`}
							aria-label='Increase Quantity'
							disabled={product?.stock === quantity}
						>
							+
						</button>
					</div>

					<button
						type='button'
						className='bg-gray-900 text-white font-bold py-4 px-7 rounded-lg hover:bg-gray-700 transition duration-300 w-full md:w-auto mb-2'
						onClick={setItemToCart}
						disabled={product?.stock === 0}
					>
						{cartItems.find((i) => i.product === product?._id)
							? 'Update Cart'
							: 'Add to Cart'}
					</button>

					{/* Product Status */}
					<div className='flex justify-start gap-2 items-center mt-2'>
						<p className=''>
							Status:
							<span
								className={
									product?.stock > 0
										? 'text-green-500'
										: 'text-red-500'
								}
							>
								{product?.stock > 0
									? ' In Stock '
									: ' Out of Stock '}
							</span>
						</p>

						{product?.stock <= 5 && product?.stock > 0 && (
							<p className='text-orange-500 font-bold'>
								Hurry! Only {product?.stock} left.
							</p>
						)}
					</div>

					{/* Product Description */}
					<div className='mt-2 flex flex-col justify-center items-start'>
						<h2 className='text-lg font-semibold mb-2'>
							Description
						</h2>
						<p className='text-balance text-justify leading-1 pb-2 font-serif'>
							{product?.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
