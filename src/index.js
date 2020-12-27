import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import * as serviceWorker from './serviceWorker';

// bootstrap rtl for rtl support page
// import "./assets/vendor/bootstrap-rtl/bootstrap-rtl.scss";
// // plugins styles downloaded
// import "./assets/vendor/fullcalendar/dist/fullcalendar.min.css";
// import "./assets/vendor/sweetalert2/dist/sweetalert2.min.css";
// import "./assets/vendor/select2/dist/css/select2.min.css";
// import "./assets/vendor/quill/dist/quill.core.css";
// import "./assets/vendor/nucleo/css/nucleo.css";
// import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// core styles
import "./assets/scss/argon-dashboard-pro-react.scss?v1.1.0";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
