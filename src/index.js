import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './assets/css/form1.css';
import './assets/css/tc_type2.css';
import { store } from './store/store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

