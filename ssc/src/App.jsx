import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';
import ContactPage from './views/ContactPage';
import CreateSessionPage from './views/CreateSessionPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Routes>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="" element={<HomePage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="create-session" element={<CreateSessionPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
