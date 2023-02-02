import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import NotificationProvider from './components/Notifications/NotificationProvider';

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <Router>
        <App />
      </Router>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
