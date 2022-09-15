import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoadingScreen from 'react-loading-screen';
import { useThemeMode } from "./common/themeContext";
import { getTheme } from "./common";
import { AppRoutes } from "./routes";


interface init {
  votes: number;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 3000);
  const { darkMode } = useThemeMode();
  let theme = React.useMemo(() => {
    return getTheme(darkMode);
  }, [darkMode]);
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
