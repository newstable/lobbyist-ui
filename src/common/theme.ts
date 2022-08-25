import {
  Palette as MuiPallete,
  PaletteColorOptions,
  PaletteOptions,
  ThemeOptions,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { colors } from "./colors";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface BreakpointOverrides {
    xs: true;
    sm: true;
    smd: true;
    md: true;
    mlg: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    third: true;
    gray: true;
    pink: true;
    tealLight: true;
  }
}

declare module "@mui/material/Typography" {
  interface Typograph {
    third: true;
    gray: true;
    pink: true;
    tealLight: true;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    third: Palette["primary"];
    gray: Palette["primary"];
    pink: Palette["primary"];
    tealLight: Palette["primary"];
  }
  interface PaletteOptions {
    third: PaletteColorOptions;
    gray: PaletteColorOptions;
    pink: PaletteColorOptions;
    tealLight: PaletteColorOptions;
  }
}

const darkOptions: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#fff",
    contrastText: "#f0f0f0",
  },
  secondary: {
    main: colors.black,
    contrastText: colors.textGray,
  },
  third: {
    main: colors.purpleMatt,
    contrastText: "#fff",
  },
  gray: {
    main: colors.lightGray,
    contrastText: "#fff",
  },
  pink: {
    main: colors.pink,
    contrastText: "#fff",
  },
  tealLight: {
    main: colors.tealLight,
    contrastText: "#fff",
  },
  background: {
    paper: "transparent",
  },
};
const lightOptions: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#24244a",
  },
  secondary: {
    main: "#723F8A",
    contrastText: "#fff",
  },
  third: {
    main: colors.purpleMatt,
    contrastText: "#fff",
  },
  gray: {
    main: colors.lightGray,
    contrastText: "#fff",
  },
  pink: {
    main: colors.pink,
    contrastText: "#fff",
  },
  tealLight: {
    main: colors.tealLight,
    contrastText: "#fff",
  },
  background: {
    paper: "transparent",
  },
};

const commonOptions: ThemeOptions = {
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      "DM Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ].join(","),
    fontSize: 10,
    body1: {
      fontSize: "1.4rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    h1: {
      fontSize: "6.6rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "4.4rem",
      fontWeight: 400,
    },
    h3: {
      fontSize: "3.4rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "3.2rem",
      fontWeight: 400,
    },
    h5: {
      fontSize: "2.8rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "2.4rem",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: "1.7rem",
      fontWeight: 400,
      lineHeight: "4rem",
    },
    subtitle2: {
      fontSize: "1.6rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "1.8rem",
      fontWeight: 400,
    },
    overline: {
      fontSize: "1.2rem",
      fontWeight: 400,
    },
    button: {
      borderRadius: "0.5rem",
      textTransform: "none",
      fontSize: "1.4rem",
      fontWeight: 400,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      smd: 610,
      md: 768,
      mlg: 911,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: "62.5%",
        },
        body: {
          backgroundColor: colors.blackGray,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0.8rem 1.4rem",
          minWidth: "15rem",
          boxShadow: "none",
          borderRadius: "1rem",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1.4rem",
        },
      },
    },
  },
};

const getTheme = (isDarkMode: boolean) => {
  const themeMerged = deepmerge(commonOptions, {
    palette: isDarkMode ? darkOptions : lightOptions,
  });
  return createTheme(themeMerged);
};

export { getTheme };
