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

const router = createBrowserRouter([
	{ path: '/', element: <LoginPage /> },
	{ path: '/home', element: <RootLayout />, children: [{ index: true, element: <HomePage /> }], loader: protectLoader },
	{ path: '/logout', action: logoutAction },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
