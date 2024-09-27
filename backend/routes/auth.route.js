import express from 'express';
import {
	deleteUserDetails_admin,
	forgotPassword,
	getAllUsers,
	getUserDetails,
	getUserProfile,
	loginUser,
	logoutUser,
	registerUser,
	resetUserPassword,
	updateUserDetails_admin,
	updateUserInformation,
	updateUserPassword,
	upload_avatar,
} from '../controllers/authController.js';
import {
	authorizeRoles,
	isAuthenticatedUser,
} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetUserPassword);
router.route('/me').get(isAuthenticatedUser, getUserProfile);

router.route('/password/update').put(isAuthenticatedUser, updateUserPassword);
router.route('/me/update').put(isAuthenticatedUser, updateUserInformation);
router.route('/me/upload_avatar').put(isAuthenticatedUser, upload_avatar);

router
	.route('/admin/users')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);

router
	.route('/admin/users/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateUserDetails_admin)
	.delete(
		isAuthenticatedUser,
		authorizeRoles('admin'),
		deleteUserDetails_admin
	);

export default router;
