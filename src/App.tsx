import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoadingScreen from 'react-loading-screen';
import { useThemeMode } from "./common/themeContext";
import { getTheme } from "./common";
import { AppRoutes } from "./routes";
import Action from "./services";
import { setCurrentProposal } from "./redux/slices/proposal";
import { dispatch } from "./redux/store";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { darkMode } = useThemeMode();
  let theme = React.useMemo(() => {
    return getTheme(darkMode);
  }, [darkMode]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    AllInfo();
  }, []);

  const AllInfo = async () => {
    const result = await Action.proposal_load();
    dispatch(setCurrentProposal(result));
  }

  return (
    <ThemeProvider theme={theme}>
      <LoadingScreen loading={loading} bgColor="#000" spinnerColor="#35B0AB">
        <CssBaseline />
        <AppRoutes />
      </LoadingScreen>
    </ThemeProvider>
  );
};

export default App;
