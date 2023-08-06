import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard';
import NotFoundPage from './pages/NotFound';
import InventoryPage from './pages/inventory';
import CustomersPage from './pages/customers';
import OrdersPage from './pages/orders';
import StatsPage from './pages/statistics';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';

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
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default App;
