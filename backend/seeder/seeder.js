import mongoose from 'mongoose';
import productModel from '../models/product.model.js';
import ProductsData from './data.js';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/config/config.env' });

const seedProducts = async () => {
	try {
		await mongoose.connect(process.env.DB_URI);

		await productModel.deleteMany();
		console.log('Products are deleated');

		await productModel.insertMany(ProductsData);
		console.log('Products are added');

		process.exit();
	} catch (error) {
		console.log('Error: ', error.message);
		process.exit();
	}
};

seedProducts();
