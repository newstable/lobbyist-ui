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
    for (var i = 0; i < result.data.length; i++) {
      const proposal = await getProposal({
        variables: { id: result.data[i].proposalId }
      });
      result.data[i].votes = proposal.data.proposal.votes;
    }
    setLoading(false);
    // result?.data.map(async (i: any) => {
    // })
    if (result) {
      dispatch(setCurrentProposal(result));
    }
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
