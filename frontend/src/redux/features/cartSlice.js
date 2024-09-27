import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
	cartItems: sessionStorage.getItem('cartItems')
		? JSON.parse(sessionStorage.getItem('cartItems'))
		: [],
};

export const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		// Add or Update Item
		setCartItem: (state, action) => {
			const item = action.payload;
			const isItemExist = state.cartItems.find(
				(i) => i.product === item.product
			);

			if (isItemExist) {
				// Update existing item quantity
				state.cartItems = state.cartItems.map((i) =>
					i.product === isItemExist.product ? item : i
				);
				toast.success('Item quantity updated');
			} else {
				// Add new item to cart
				state.cartItems.push(item);
				toast.success('Item added to cart');
			}
			sessionStorage.setItem(
				'cartItems',
				JSON.stringify(state.cartItems)
			);
		},

		// Remove Item
		removeCartItem: (state, action) => {
			const productId = action.payload;
			state.cartItems = state.cartItems.filter(
				(i) => i.product !== productId
			);
			sessionStorage.setItem(
				'cartItems',
				JSON.stringify(state.cartItems)
			);
			toast.success('Item removed from cart');
		},
	},
});

export const { setCartItem, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
