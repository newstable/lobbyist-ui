import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoadingScreen from 'react-loading-screen';
import { useThemeMode } from "./common/themeContext";
import { getTheme } from "./common";
import { AppRoutes } from "./routes";
import Action from "./services";
import { useSelector, RootState } from "./redux/store";
import { NotificationManager } from 'react-notifications';

interface init {
  votes: number;
}

const App = () => {
  const [address, setAddress] = useState("");
  const walletAddress: any = useSelector(
    (state: RootState) => state.wallet.address
  );
  const [loading, setLoading] = useState(true);
  const { darkMode } = useThemeMode();
  let theme = React.useMemo(() => {
    return getTheme(darkMode);
  }, [darkMode]);

  const AllInfo = async () => {
    await Action.Proposal_load({ address: address });
    setLoading(false);
    if (loading) {
      NotificationManager.info("This app is currently in Beta, please use at your own risk", "Information");
    }
  }

  useEffect(() => {
    setAddress(walletAddress);
  }, [walletAddress]);
  const [time, setTime] = useState<number>();
  useEffect(() => {
    const timer = setTimeout(() => { setTime(+new Date()); AllInfo() }, 5000)
    return () => clearTimeout(timer)
  }, [time])
  return (
    <ThemeProvider theme={theme}>
      <LoadingScreen loading={loading} bgColor="#282931" spinnerColor="#3a78ff">
        <CssBaseline />
        <AppRoutes />
      </LoadingScreen>
    </ThemeProvider>
  );
};

export default App;
