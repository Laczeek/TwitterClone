import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import userSlice from './user-slice';

const store = configureStore({
	reducer: {
		ui: uiSlice,
		user: userSlice,
	},
});

export default store;

export type AppDispatchType = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
