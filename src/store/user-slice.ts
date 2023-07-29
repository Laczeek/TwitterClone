import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenType } from '../models/interfaces';
import { getTokenFromLocalStorage } from '../firebase/authHelpers';

const userToken = getTokenFromLocalStorage();

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userToken
	},
	reducers: {
		login(state, action: PayloadAction<TokenType>) {
			state.userToken = action.payload;
		},
		logout(state) {
			state.userToken = null;
		}
	},
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
