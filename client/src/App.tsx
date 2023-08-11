import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/notFound';
import ProductsPage from './pages/products';
import CustomersPage from './pages/customers';
import OrdersPage from './pages/orders';
import StatsPage from './pages/statistics';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import { ToastContainer, toast } from 'react-toastify';

const notify = () => toast('Alert');

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage alert={notify} />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/customers' element={<CustomersPage />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/statistics' element={<StatsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
            <ToastContainer
                position='bottom-right'
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme='light'
            />
        </Router>
    );
};

export default App;
