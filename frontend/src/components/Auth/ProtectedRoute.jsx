import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, isLoading } = useSelector((state) => {
		return state.auth;
	});
	// console.log('Authenticated : ', isAuthenticated);
	if (isLoading) {
		return;
	}

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			/>
		);
	}
	return children;
};

export default ProtectedRoute;
