import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import { ThemeCtxProvider } from "./common/themeContext";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";
import "./index.scss";
import "./assets/css/nucleo-icons.css"
import "./assets/css/app.css"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPQLENDPOINT,
    cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <ThemeCtxProvider>
          <App />
        </ThemeCtxProvider>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
