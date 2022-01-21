import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './atomic/templates/layout/Header';
import AuthRedirect from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';

const App: React.FC = () => {
    console.log('ttt');
    return (
        <React.Fragment>
            <Header token={null} />

            <Routes>
                <Route path="/"
                    element={<Home />}
                />
                <Route path="/auth/redirect"
                    element={<AuthRedirect token={null} />}
                />
                <Route path="/dashboard"
                    element={<Dashboard loading={false} />}
                />
            </Routes>
        </React.Fragment>
    );
};


export default App;
