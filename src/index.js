import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import './fonts/Montserrat-Regular.ttf'


render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('root'));