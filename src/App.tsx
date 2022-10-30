import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoadingScreen from 'react-loading-screen';
import { useThemeMode } from "./common/themeContext";
import { getTheme } from "./common";
import { AppRoutes } from "./routes";
import Action from "./services";
import { useSelector, RootState } from "./redux/store";
import { NotificationManager } from 'react-notifications';

const defaultAppData = { containRef: null, scrollState: 0 };
export const AppContext: any = createContext({});
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
  }

  useEffect(() => {
    if (!loading)
      NotificationManager.info("This app is currently in Beta, please use at your own risk", "Information");
  }, [loading])

  useEffect(() => {
    setAddress(walletAddress);
  }, [walletAddress]);
  const [time, setTime] = useState<number>();
  useEffect(() => {
    const timer = setTimeout(async () => { setTime(+new Date()); await AllInfo() }, 5000)
    return () => clearTimeout(timer)
  }, [time])

  const appWrapperRef: any = useRef();
  const [appData, setAppData] = useState<any>({ ...defaultAppData });
  useEffect(() => {
    let data = { ...appData, containRef: appWrapperRef.current };
    setAppData(data);
  }, []);
  const onScroll = () => { setAppData({ ...appData, scrollState: appData.scrollState + 1 }); }

  return (
    <AppContext.Provider value={[appData, setAppData]}>
      <ThemeProvider theme={theme}>
        <LoadingScreen loading={loading} bgColor="#282931" spinnerColor="#3a78ff">
          <CssBaseline />

          <div className='app-wrapper' ref={appWrapperRef} onScroll={onScroll}>
            <AppRoutes />
          </div>
        </LoadingScreen>
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default App;
