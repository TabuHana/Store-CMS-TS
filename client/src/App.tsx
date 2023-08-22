import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DashboardPage from './pages/dashboard';
// import NotFoundPage from './pages/notFound';
// import ProductsPage from './pages/products';
// import CustomersPage from './pages/customers';
// import OrdersPage from './pages/orders';
// import StatsPage from './pages/statistics';
// import SettingsPage from './pages/settings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Dashboard from './pages/dashboard';
import NotFound from './pages/notfound';
import Customers from './pages/customer';


const notify = (message: string) => toast(message);

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LoginPage alert={notify} />} />
                <Route path='/register' element={<RegisterPage alert={notify} />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/customers' element={<Customers />} />
                {/* <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/customers' element={<CustomersPage />} />
                <Route path='/orders' element={<OrdersPage />} />
                <Route path='/statistics' element={<StatsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/about' element={<AboutPage />} /> */}
                <Route path='/*' element={<NotFound />} /> 
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
