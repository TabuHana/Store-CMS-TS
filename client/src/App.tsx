import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/dashboard';
import NotFound from './pages/notFound';
import InventoryPage from './pages/inventory';
import CustomersPage from './pages/customers';
import OrdersPage from './pages/orders';
import StatisticsPage from './pages/statistics';
import SettingsPage from './pages/settings';
import AboutPage from './pages/about';
import Login from './pages/auth/Login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/inventory' element={<InventoryPage />} />
                <Route path='/customers' element={<CustomersPage />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/statistics' element={<StatisticsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
