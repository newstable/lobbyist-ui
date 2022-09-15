import React, { useState, useEffect } from "react";
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
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Action from "./services";
import { useSelector, RootState } from "./redux/store";
import { NotificationManager } from 'react-notifications';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPQLENDPOINT,
  cache: new InMemoryCache(),
});

const [address, setAddress] = useState("");
const walletAddress: any = useSelector(
  (state: RootState) => state.wallet.address
);

const AllInfo = async () => {
  await Action.Proposal_load({ address: address });
  NotificationManager.info("This app is currently in Beta, please use at your own risk", "Information");
  if (!window.ethereum)
    NotificationManager.error("Please install wallet in your device", "Error");
}

useEffect(() => {
  setAddress(walletAddress);
}, [walletAddress]);
const [time, setTime] = useState<number>();
useEffect(() => {
  const timer = setTimeout(() => { setTime(+new Date()); AllInfo() }, 5000)
  return () => clearTimeout(timer)
}, [time])

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <ThemeCtxProvider>
          <App />
          <NotificationContainer />
        </ThemeCtxProvider>
      </ApolloProvider>
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
