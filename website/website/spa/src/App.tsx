import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Header from './atomic/templates/layout/Header';

const App: React.FC = () => {
    return (
        <React.Fragment>
            <Header />

            <Routes>
                <Route path="/"
                    element={<Home />}
                />
            </Routes>
        </React.Fragment>

    );
};


export default App;
