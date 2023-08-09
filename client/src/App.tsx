import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/notFound';
import ProductsPage from './pages/products';
import CustomersPage from './pages/customers';
import OrdersPage from './pages/orders';
import StatsPage from './pages/statistics';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage />} />
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
        </Router>
    );
};

export default App;
