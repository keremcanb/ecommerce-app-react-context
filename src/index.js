import ReactDOM from 'react-dom';
import { debugContextDevtool } from 'react-context-devtool';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { ProductsProvider } from './context/actions/products_context';
import { FilterProvider } from './context/actions/filter_context';
import { CartProvider } from './context/actions/cart_context';
import { UserProvider } from './context/actions/user_context';
import './index.css';

const container = document.getElementById('root');

ReactDOM.render(
  <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </UserProvider>,
  container
);

debugContextDevtool(container);
