import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
