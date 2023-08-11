import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.ts';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RootLayout from './pages/RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import PostPage from './pages/PostPage.tsx';

import { action as actionLogout } from './pages/Logout.ts';
import { loader as protectLoader } from './firebase/authHelpers.ts';

import './index.css';
import MostLikedPage from './pages/MostLikedPage.tsx';

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage />, errorElement: <ErrorPage /> },
	{
		path: 'home',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		loader: protectLoader,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: ':id', element: <PostPage /> },
			{ path: 'most-liked', element: <MostLikedPage /> },
		],
	},
	{ path: '/logout', action: actionLogout },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<RouterProvider router={router} />
			</ErrorBoundary>
		</Provider>
	</React.StrictMode>
);
