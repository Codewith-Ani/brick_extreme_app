import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setCartItem, removeCartItem } from '../../redux/features/cartSlice'; // Ensure these action creators exist

const Cart = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	// const [savedItems, setSavedItems] = useState([]); // Dummy savedItems for now

	// Calculate the total price
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	// Handle quantity change (increase or decrease)
	const handleQuantityChange = (item, delta) => {
		const newQuantity = Math.max(item.quantity + delta, 1); // Ensure quantity doesn't go below 1
		dispatch(setCartItem({ ...item, quantity: newQuantity })); // Update item in cart with new quantity
	};

	// Handle removing an item from the cart
	const handleRemoveItem = (item) => {
		dispatch(removeCartItem(item.product)); // Remove the item from the cart by its product id
		// toast.success(`${item.name} removed from cart.`);
	};

	return (
		<div className='flex flex-col items-center mt-5 px-4'>
			<div className='w-full max-w-[90%] grid grid-cols-1 lg:grid-cols-3 bg-gray-200 p-5 gap-8'>
				<div className='lg:col-span-2 p-5'>
					<h2 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
						Shopping Cart
					</h2>

					{/* Check if cart is empty */}
					{cartItems.length === 0 ? (
						<div className='text-center text-lg'>
							Your cart is empty.
						</div>
					) : (
						<div className='mb-5'>
							{cartItems.map((item, index) => (
								<div
									className='flex flex-wrap items-start border-b-2 border-gray-500 p-4'
									key={index}
								>
									{/* Product Image */}
									<Link to={`/product/${item.product}`}>
										<div className='w-24 h-24 md:w-32 md:h-32 mr-4 bg-gray-200'>
											<img
												className='rounded-lg object-fill p-1 w-full aspect-square cursor-pointer'
												src={item.image}
												alt={item.name}
											/>
										</div>
									</Link>

									{/* Product Info */}
									<div className='flex-1'>
										<Link to={`/product/${item.product}`}>
											<div className='text-lg font-semibold cursor-pointer'>
												{item.name}
											</div>
										</Link>
										<div className='text-sm md:text-lg'>
											${item.price.toFixed(2)}
										</div>

										{/* Quantity, Remove, and Save for Later */}
										<div className='mt-2 flex flex-col sm:flex-row items-start sm:items-center'>
											<div className='flex items-center mb-2 sm:mb-0'>
												<button
													className='px-2 py-1 bg-gray-300 rounded-md'
													onClick={() =>
														handleQuantityChange(
															item,
															-1
														)
													}
													disabled={
														item.quantity === 1
													}
												>
													-
												</button>
												<span className='mx-2'>
													{item.quantity > item.stock
														? item.stock
														: item.quantity}
												</span>
												<button
													disabled={
														item.quantity >=
														item.stock
													}
													className='px-2 py-1 bg-gray-300 rounded-md'
													onClick={() =>
														handleQuantityChange(
															item,
															1
														)
													}
												>
													+
												</button>
											</div>
											<div className='ml-0 sm:ml-4 flex'>
												<button
													className='underline text-red-600 leading-3 text-lg px-3 py-2 rounded-md mr-2'
													onClick={() =>
														handleRemoveItem(item)
													}
												>
													Delete
												</button>
											</div>
										</div>
									</div>
									<div>
										<h2 className='text-lg font-bold'>
											$
											{(
												item.price * item.quantity
											).toFixed(2)}
										</h2>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Second Column: Summary and Checkout */}
				<div className='bg-white   p-6 shadow-lg rounded-lg'>
					<h3 className='text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
						Order Summary
					</h3>

					{/* Total Number of Items */}
					<div className='flex justify-between mb-4'>
						<span>Total Items:</span>
						<span>
							{cartItems.reduce(
								(total, item) => total + item.quantity,
								0
							)}
						</span>
					</div>

					{/* Subtotal */}
					<div className='flex  justify-between text-lg md:text-xl lg:text-2xl font-semibold mb-4'>
						<span>Subtotal:</span>
						<span>${totalPrice.toFixed(2)}</span>
					</div>

					{/* Checkout Button */}
					<Link
						className='w-full bg-black text-white px-6 py-3 rounded-lg hover:opacity-80'
						to='/shipping'
					>
						Proceed to Checkout
					</Link>
				</div>
			</div>

			{/* Optional: Display Saved Items */}
		</div>
	);
};

export default Cart;
