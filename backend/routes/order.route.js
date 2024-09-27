import express from 'express';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/auth.middleware.js';
import {
	deleteOrders_admin,
	getAllOrders_admin,
	getMyOrders,
	getOrderDetails,
	newOrder,
	updateOrder_admin,
} from '../controllers/OrderController.js';
const router = express.Router();

router.route('/orders/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/:id').get(isAuthenticatedUser, getOrderDetails);
router.route('/me/orders').get(isAuthenticatedUser, getMyOrders);

router
	.route('/admin/orders')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders_admin);

router
	.route('/admin/orders/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder_admin)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrders_admin);
export default router;
