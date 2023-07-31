import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.ts';
import LoginPage from './pages/LoginPage.tsx';
import RootLayout from './pages/RootLayout.tsx';
import HomePage from './pages/HomePage.tsx';

import { action as logoutAction } from './pages/Logout.ts';
import { loader as protectLoader } from './firebase/authHelpers.ts';

import './index.css';
import ErrorBoundary from './components/ui/ErrorBoundary.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage />, errorElement: <ErrorPage /> },
	{
		path: '/home',

		element: <RootLayout />,
		loader: protectLoader,
		children: [{ index: true, element: <HomePage /> }],
	},
	{ path: '/logout', action: logoutAction },
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
