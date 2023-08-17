import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FetchedPostType } from '../models/interfaces';

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		isNavShowing: false,
		btnLoadingState: false,
		originalPosts: [] as FetchedPostType[] | [],
		posts: [] as FetchedPostType[] | []
	},
	reducers: {
		toggleNavigation(state) {
			state.isNavShowing = !state.isNavShowing;
		},
		changeBtnLoadingState(state, action: PayloadAction<boolean>) {
			state.btnLoadingState = action.payload;
		},
		setPosts(state, action: PayloadAction<FetchedPostType[]>) {
			state.originalPosts = action.payload;
			state.posts = action.payload
		},
		filterPosts(state, action: PayloadAction<string>) {
			if(action.payload.trim().length === 0) {
				state.posts = state.originalPosts;
			}
			const filteredPosts = state.posts.filter(post => post.identyfier === '@' + action.payload);

			if(filteredPosts.length > 0) {
				state.posts = filteredPosts
			}else {
				state.posts = state.originalPosts;
			}
		}
	},
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
