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
import { useLazyQuery } from "@apollo/client";
import { GET_PROPOSAL } from "./gql";
import loadingImg from "./assets/dao.jpg";

interface init {
  votes: number;
}

const App = () => {
  const [getProposal] = useLazyQuery(GET_PROPOSAL);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useThemeMode();
  let theme = React.useMemo(() => {
    return getTheme(darkMode);
  }, [darkMode]);
  useEffect(() => {
    AllInfo();
  }, []);

  const AllInfo = async () => {
    var result = await Action.Proposal_load();
    setLoading(false);
    if (result) {
      dispatch(setCurrentProposal(result));
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LoadingScreen loading={loading} bgColor="#282931" logoSrc={loadingImg} spinnerColor="#3a78ff">
        <CssBaseline />
        <AppRoutes />
      </LoadingScreen>
    </ThemeProvider>
  );
};

export default App;
