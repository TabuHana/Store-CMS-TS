import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './context/ThemeContext';
import { ErrorPage } from './pages/Error/Error.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Customers from './pages/Customers/Customers.tsx';
import Products from './pages/Products/Products.tsx';
import Orders from './pages/Orders/Orders.tsx';
import Register from './pages/auth/Register.tsx';
import Login from './pages/auth/Login.tsx';
import SplitScreen from './components/SplitScreen/SplitScreen.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import NewCustomer from './pages/Customers/newCustomer.tsx';
// import FullFeaturedCrudGrid from './pages/Customers/FullFeaturedCrudGrid.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'customers',
                element: <Customers />,
            },
            {
                path: 'customers/new',
                element: <NewCustomer />,
            },
            {
                path: 'products',
                element: <Products />,
                // element: <FullFeaturedCrudGrid />
            },
            {
                path: 'orders',
                element: <Orders />,
            },
        ],
    },
    {
        path: '/auth',
        element: <SplitScreen />,
        children: [
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <RouterProvider router={router} />
                    <ReactQueryDevtools />
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
