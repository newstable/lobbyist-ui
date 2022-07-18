import React, { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

interface IThemeCtx {
  darkMode: boolean;
  handleDarkMode: () => void;
}

// Creates a new context object
const ThemeCtx = createContext<IThemeCtx>({
  darkMode: true,
  handleDarkMode: () => {},
});

const useThemeMode = () => {
  // return the current context value for themeCtx
  // i.e. darkMode and handleDarkMode
  return useContext(ThemeCtx);
};

interface Props {
  children?: React.ReactNode;
}

const ThemeCtxProvider = ({ children }: Props) => {
  // check whether the client's system has enabled dark theme
  // if enabled then, use dark theme by default
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // state variable to check wheather dark mode is enabled or not
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      // if user has opted for dark theme
      // then set the value of darkMode as true
      setDarkMode(true);
    } else if (localStorage.getItem("theme") === "light") {
      // if user has opted for light theme
      // then set the value of darkMode as false
      setDarkMode(false);
    } else {
      // if there is nothing in the local storage
      // then, use the system theme by default
      // setDarkMode(prefersDarkMode);
      setDarkMode(true);
    }
  }, [prefersDarkMode]);

  // toggle the theme function
  const handleDarkMode = () => {
    if (darkMode) {
      // if dark theme is enabled,
      // then disable it and select the light theme
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      // if dark theme is disabled,
      // then enable it and select the dark theme
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // return the, Provider component that allows the
  // consuming components to subscribe to context
  // changes.
  return (
    <ThemeCtx.Provider value={{ darkMode, handleDarkMode }}>
      {children}
    </ThemeCtx.Provider>
  );
};

export { useThemeMode, ThemeCtxProvider };
