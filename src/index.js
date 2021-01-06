import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { ProductsProvider } from './context/actions/products_context';
import { FilterProvider } from './context/actions/filter_context';
import { CartProvider } from './context/actions/cart_context';
import { UserProvider } from './context/actions/user_context';

ReactDOM.render(<App />, document.getElementById('root'));
