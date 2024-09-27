import React from 'react';
import Header from '../components/Layout/Header/Header';
import Footer from '../components/Layout/Footer/Footer';
import Home from '../Pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProductDetails from '../components/Product/ProductDetails/ProductDetails';
import './App.css';
import Products from '../Pages/Products/Products';
import Login from '../components/Auth/Login/Login';
import Register from '../components/Auth/Register/Register';
import NotFound from '../components/Layout/NotFound/NotFound';
import { SearchProvider } from '../context/SearchContext';
import UserProfile from '../Pages/User/Profile/UserProfile';
import UpdateProfile from '../Pages/User/Profile/UpdateProfile';
import UpdatePassword from '../Pages/User/Profile/UpdatePassword';
import ProtectedRoute from '../components/Auth/ProtectedRoute';
import Upload_Avatar from '../Pages/User/Profile/Upload_Avatar';
import ForgotPassword from '../Pages/User/Profile/ForgotPassword';
import ResetPassword from '../Pages/User/Profile/ResetPassword';
import Cart from '../components/Cart/Cart';
import Shipping from '../components/Cart/Shipping';

const App = () => {
	return (
		<SearchProvider>
			<BrowserRouter>
				<Header />
				<div className='app-container'>
					<Toaster position='top-center' />
					<div className=''>
						<Routes>
							<Route
								path='/'
								element={<Home />}
							/>

							<Route
								path='/products'
								element={<Products />}
							/>

							<Route
								path='/about'
								element={<> About us</>}
							/>

							<Route
								path='/product/:id'
								element={<ProductDetails />}
							/>

							<Route
								path='/contact'
								element={<> Contact Us </>}
							/>
							<Route
								path='/login'
								element={<Login />}
							/>
							<Route
								path='/register'
								element={<Register />}
							/>
							<Route
								path='/me/profile'
								element={
									<ProtectedRoute>
										<UserProfile />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/me/update_profile'
								element={
									<ProtectedRoute>
										<UpdateProfile />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/me/update_password'
								element={
									<ProtectedRoute>
										<UpdatePassword />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/me/upload_avatar'
								element={
									<ProtectedRoute>
										<Upload_Avatar />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/forgot_password'
								element={<ForgotPassword />}
							/>
							<Route
								path='/password/reset/:token'
								element={<ResetPassword />}
							/>

							<Route
								path='/cart'
								element={
									<ProtectedRoute>
										<Cart />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/shipping'
								element={
									<ProtectedRoute>
										<Shipping />
									</ProtectedRoute>
								}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</div>
				</div>
				<Footer />
			</BrowserRouter>
		</SearchProvider>
	);
};

export default App;
