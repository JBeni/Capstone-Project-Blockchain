import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';
import configureStore from './store/configureStore';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={configureStore()}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
