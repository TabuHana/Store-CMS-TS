import Nav from './components/Nav';
import Home from './pages/Home';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className='main-container w-screen h-screen items-center bg-slate-800'>
            <nav className='item-nav w-20'>
                <Nav />
            </nav>
            <Router>
                <main className='item-content w-80'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
}

export default App;
