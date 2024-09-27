import express from 'express';
import {
	createProductReview,
	deleteProduct,
	deleteProductReview,
	getAllCategories,
	getProductReviews,
	getProducts,
	getSingleProduct,
	newProduct,
	updateSingleProduct,
} from '../controllers/productController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/auth.middleware.js';

const router = express();

// GET ALL PRODUCTS
router.route('/products').get(getProducts);

// GET SINGLE PRODUCT
router.route('/product/:id').get(getSingleProduct);

// GET ALL CATEGORIES
router.route('/products/categories').get(getAllCategories);

// ---------------------------------------------- ADMIN ROUTES --------------------------------------------------

// ADD PRODUCTS
router
	.route('/admin/add_products')
	.post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

// UPDATE SINGLE PRODUCT
router
	.route('/admin/products/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateSingleProduct);

// DELETE SINGLE PRODUCT
router
	.route('/admin/products/:id')
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

// PRODUCT REVIEW
router
	.route('/reviews')
	.put(isAuthenticatedUser, createProductReview)
	.get(isAuthenticatedUser, getProductReviews);

router
	.route('/admin/reviews')
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProductReview);

export default router;
