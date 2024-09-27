import React, { useState } from 'react';

const Shipping = () => {
	const [shippingInfo, setShippingInfo] = useState({
		name: '',
		mobileNumber: '',
		pincode: '',
		houseNo: '',
		area: '',
		landmark: '',
		city: '',
		country: '',
	});

	const handleChange = (e) => {
		setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Shipping Info Submitted: ', shippingInfo);
		// Add form submission logic or API calls here
	};

	return (
		<div className='flex flex-col items-center mt-10 px-5'>
			<div className='w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-md'>
				<h2 className='text-2xl font-semibold mb-6 text-center'>
					Shipping Information
				</h2>

				<form
					onSubmit={handleSubmit}
					className='space-y-4'
				>
					{/* Full Name */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Full Name
						</label>
						<input
							type='text'
							name='name'
							value={shippingInfo.name}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='John Doe'
							required
						/>
					</div>

					{/* Mobile Number */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Mobile Number
						</label>
						<input
							type='tel'
							name='mobileNumber'
							value={shippingInfo.mobileNumber}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='+1 234 567 8901'
							required
						/>
					</div>

					{/* Pincode */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Pincode
						</label>
						<input
							type='text'
							name='pincode'
							value={shippingInfo.pincode}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='123456'
							required
						/>
					</div>

					{/* House No. */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							House No.
						</label>
						<input
							type='text'
							name='houseNo'
							value={shippingInfo.houseNo}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='1234'
							required
						/>
					</div>

					{/* Area */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Area
						</label>
						<input
							type='text'
							name='area'
							value={shippingInfo.area}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='Elm Street'
							required
						/>
					</div>

					{/* Landmark */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Landmark
						</label>
						<input
							type='text'
							name='landmark'
							value={shippingInfo.landmark}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='Near Central Park'
							required
						/>
					</div>

					{/* Town/City */}
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Town/City
						</label>
						<input
							type='text'
							name='city'
							value={shippingInfo.city}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='New York'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Country
						</label>
						<input
							type='text'
							name='country'
							value={shippingInfo.country}
							onChange={handleChange}
							className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							placeholder='America'
							required
						/>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
					>
						Continue to Payment
					</button>
				</form>
			</div>
		</div>
	);
};

export default Shipping;
