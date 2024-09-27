import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	isAuthenticated: false,
	isLoading: false,
};

export const userSlice = createSlice({
	initialState,
	name: 'userSlice',
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
		setisAuthenticated(state, action) {
			state.isAuthenticated = action.payload;
		},
		setisLoading(state, action) {
			state.isLoading = action.payload;
		},
	},
});

export default userSlice.reducer;
export const { setUser, setisAuthenticated, setisLoading } = userSlice.actions;
