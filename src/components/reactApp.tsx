import classNames from "classnames";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Header } from "./header";
import { SidebarMenu } from "./sidebarMenu";

const ReactApp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mlg"));

  return (
    <div className={classNames("app flex", isMobile && "flex-col")}>
      <SidebarMenu />
      <div className={classNames("main w-full flex flex-col")}>
        <div className="container px-6">
          <Header />
          <div className="flex w-full mx-auto content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export { ReactApp };
