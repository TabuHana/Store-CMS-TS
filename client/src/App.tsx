import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import InventoryPage from './pages/InventoryPage';
import CustomersPage from './pages/CustomersPage';
import OrdersPage from './pages/OrdersPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/auth/Login';

function App() {
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
                <Route path='/login' element={<Login />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
