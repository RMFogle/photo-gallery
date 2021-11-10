import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import AppRouter from './AppRouter';

ReactDOM.render(
  <Provider store={store}>   
      <AppRouter />
  </Provider>,
  document.getElementById('root')
);
