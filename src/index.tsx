import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={"dev-7pr07becg7e5y37g.us.auth0.com"}
      clientId={"wNQp2rCfSOopNJ9bCcOevl5LFya6A2oD"}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_API_HOST,
      }}
      useRefreshTokens={true}
      cacheLocation={"localstorage"}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
