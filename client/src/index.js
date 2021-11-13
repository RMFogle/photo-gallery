import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/store';
import { Provider } from 'react-redux';
// import './index.css';
import './styles/index.css'
// import AppRouter from './AppRouter';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
      <App />
      {/* <AppRouter /> */}
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
