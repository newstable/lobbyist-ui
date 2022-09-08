import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoadingScreen from 'react-loading-screen';
import { useThemeMode } from "./common/themeContext";
import { getTheme } from "./common";
import { AppRoutes } from "./routes";
import Action from "./services";
import { Coins } from "./blockchain";
import { useSelector, RootState } from "./redux/store";

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

  var timeset: any = null;
  useEffect(() => {
    setAddress(walletAddress);
  }, [walletAddress]);

  const AllInfo = async () => {
    await Action.Proposal_load({ address: address });
    setLoading(false);
  }

  setTimeout(async () => {
    AllInfo();
  }, 5000);

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
