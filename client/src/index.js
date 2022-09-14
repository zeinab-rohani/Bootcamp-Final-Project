import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import CurrentRequestProvider from "./components/CurrentRequestContext";
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CurrentRequestProvider>
    <Auth0Provider
    domain="dev-zanvxts5.us.auth0.com"
    clientId="FokUZt1M1mhi9I4etZRFrJMULBjbe8fJ"
    redirectUri={window.location.origin}
    audience= 'finalProjectBackend'
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
    </CurrentRequestProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
