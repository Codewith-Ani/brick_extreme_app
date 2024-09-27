import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please enter product name'],
			maxLength: [200, 'Product name cannot exceed 200 characters'],
		},
		price: {
			type: Number,
			required: [true, 'Please enter product price'],
			min: [0, 'Price cannot be negative'], // Added minimum price validation
		},
		description: {
			type: String,
			required: [true, 'Please enter product description'], // Fixed error message
		},
		ratings: {
			type: Number,
			default: 0,
			min: [0, 'Ratings cannot be negative'], // Optional minimum ratings validation
			max: [5, 'Ratings cannot exceed 5'], // Optional maximum ratings validation
		},
		images: [
			{
				public_id: {
					type: String,
					required: [true, 'Please enter public ID for the image'],
				},
				url: {
					type: String,
					required: [true, 'Please enter image URL'],
				},
			},
		],
		category: {
			type: [String], // More specific definition
			required: [true, 'Please enter product category'],
		},
		seller: {
			type: String,
			required: [true, 'Please enter product seller'],
		},
		stock: {
			type: Number,
			required: [true, 'Please enter product stock'],
			min: [0, 'Stock cannot be negative'], // Added minimum stock validation
		},
		number_of_reviews: {
			type: Number,
			default: 0,
		},
		reviews: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
				},
				rating: {
					type: Number,
					required: [true, 'Please enter rating'],
					min: [0, 'Rating cannot be less than 0'], // Additional validation
					max: [5, 'Rating cannot exceed 5'], // Additional validation
				},
				comment: {
					type: String,
					required: [true, 'Please enter a review comment'],
				},
			},
		],
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

export default mongoose.model('Product', productSchema);
