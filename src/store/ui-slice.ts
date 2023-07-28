import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isNavShowing: false,
	},
	reducers: {
		toggleNavigation(state) {
			state.isNavShowing = !state.isNavShowing;
		},
	},
});
 
export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
