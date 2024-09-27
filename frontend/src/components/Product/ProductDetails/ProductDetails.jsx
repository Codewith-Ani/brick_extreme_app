import React, { useEffect, useState } from 'react';

import default_image from '../../../assets/droid1.jpg';
import default_image2 from '../../../assets/droid2.png';
import { useGetProductsDetailsQuery } from '../../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader/Loader';
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { setCartItem, removeCartItem } from '../../../redux/features/cartSlice';

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
		<div className='flex flex-col gap-6 p-6 bg-gray-900 min-h-screen text-white'>
			<div className='flex flex-col md:flex-row gap-8'>
				{/* Thumbnail Images */}
				<div className='flex flex-col-reverse md:flex-row md:w-[50%]'>
					<div className='flex p-2 flex-row md:flex-col w-[20%] relative bg-white h-[60vh] overflow-y-scroll gap-6 md:justify-center'>
						{/* {product?.images?.map((img, index) => ( */}
						{product?.images?.map((img, index) => (
							<img
								className={`w-[100%]  object-fill aspect-square rounded-md cursor-pointer border-2 ${
									img.url === activeImage
										? 'border-black'
										: 'border-gray-300'
								} hover:border-black`}
								key={index}
								//								src={img.url || default_image}
								src={default_image}
								alt={`Thumbnail ${index + 1}`}
								onClick={() =>
									setActiveImage(img.url || default_image)
								}
							/>
						))}
					</div>

					{/* Main Image */}
					<div className='flex-1 flex items-center  justify-center'>
						<img
							className='w-full  max-w-lg  h-[80vh] md:h-auto object-fill rounded-lg shadow-lg'
							// src={activeImage || default_image}
							src={default_image2}
							alt={product?.name || 'Product Image'}
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className='flex-1'>
					<h1 className='text-lg md:text-4xl font-bold  mb-3'>
						{product?.name}
					</h1>
					<p className='mb-2'>Product ID: {product?._id}</p>
					<div className='flex items-center mb-3'>
						<StarRatings
							rating={product?.ratings || 0}
							starRatedColor='#ffb829'
							numberOfStars={5}
							name='rating'
							starDimension='24px'
							starSpacing='1px'
						/>
						<span className='ml-2'>
							({product?.number_of_reviews} Reviews)
						</span>
					</div>
					<p className='text-2xl font-semibold text-red-500 mb-4'>
						${product?.price}
					</p>

					{/* Quantity Selector */}
					<div className='flex items-center mb-4'>
						<button
							onClick={() => handleQuantityChange(-1)}
							className={`px-4 py-2 rounded-l text-lg ${
								quantity === 1
									? 'bg-gray-700 cursor-not-allowed'
									: 'bg-gray-500 hover:bg-gray-700'
							} text-white`}
							aria-label='Decrease Quantity'
						>
							-
						</button>
						<span className='text-white px-5 py-2 text-lg'>
							{product?.stock > 0 ? quantity : 0}
						</span>
						<button
							onClick={() => handleQuantityChange(1)}
							className='bg-gray-500 text-white px-4 py-2 rounded-r text-lg hover:bg-gray-700'
							aria-label='Increase Quantity'
							disabled={product?.stock === quantity}
						>
							+
						</button>
					</div>

					<button
						type='button'
						className='bg-gray-700 text-white font-bold py-3 px-6 rounded hover:bg-gray-500 transition duration-300 w-full md:w-auto mb-4'
						onClick={setItemToCart}
						disabled={product?.stock === 0}
					>
						{cartItems.find((i) => i.product === product?._id)
							? 'Update Cart'
							: 'Add to Cart'}
					</button>

					{/* Product Status */}
					<div className='flex justify-start gap-3 items-center mt-2'>
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
					<div className='mt-6'>
						<h2 className='text-lg font-semibold mb-2'>
							Description
						</h2>
						<p>{product?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
