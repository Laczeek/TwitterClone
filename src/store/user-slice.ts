import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenType } from '../models/interfaces';
import { getTokenFromLocalStorage } from '../firebase/authHelpers';

const userToken = getTokenFromLocalStorage();

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userToken,
	},
	reducers: {
		login(state, action: PayloadAction<TokenType>) {
			state.userToken = action.payload;
		},
		logout(state) {
			state.userToken = null;
		},
		changeImage(state, action: PayloadAction<string>) {
			state.userToken!.photoURL = action.payload;
		},
		changeDescription(state, action:PayloadAction<string>) {
			state.userToken!.description = action.payload;
		}
	},
});

export default userSlice.reducer;

export const userActions = userSlice.actions;
