import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/notFound';
import InventoryPage from './pages/inventory';
import CustomersPage from './pages/customers';
import OrdersPage from './pages/orders';
import StatsPage from './pages/statistics';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/inventory' element={<InventoryPage />} />
                <Route path='/customers' element={<CustomersPage />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/statistics' element={<StatsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/auth/login' element={<LoginPage />} />
                <Route path='/auth/register' element={<RegisterPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
