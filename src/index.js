import React from 'react';
import ReactDOM from 'react-dom/client';

import AOS from "aos";
import "aos/dist/aos.css";

import Home from './pages/Home';


AOS.init();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Home />
);

