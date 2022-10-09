import classNames from "classnames";
import { useEffect, useState } from "react";
import { Box, Typography, SvgIcon, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";
import { MenuLink } from "../../@types";
import { ReactComponent as GaugeIcon } from "../../assets/icons/gauge.svg";
import { ReactComponent as WallIcon } from "../../assets/icons/wall.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord.svg";
import { ReactComponent as MirrorIcon } from "../../assets/icons/mirror.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.scss";
import './sidebarItem-Menu.scss';
import { colors } from "../../common";
import switchNetwork from "../header/switchchain";
import { useSelector } from "../../redux/store";
import { RootState } from "../../redux/store";

type Props = {};

const SidebarMenu = (props: Props) => {
  const library: any = useSelector(
    (state: RootState) => state.provider.provider
  );
  const chain: any = useSelector(
    (state: RootState) => state.chain.id
  );
  const { PUBLIC_URL } = process.env;
  const theme = useTheme();
  const { pathname } = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("mlg"));
  const getIcon = (
    iconName: string
  ): React.FC<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  > => {
    switch (iconName) {
      case "gauge":
        return GaugeIcon;
      case "wall":
        return WallIcon;
      case "chart":
        return ChartIcon;
      case "twitter":
        return TwitterIcon;
      case "discord":
        return DiscordIcon;
      case "mirror":
        return MirrorIcon;
      case "docs":
        return DocsIcon;
      default:
        break;
    }
    return () => <svg></svg>;
  };

  const links: MenuLink[] = [
    {
      icon: "gauge",
      text: "Dashboard",
      href: "/",
      type: "in"
    },
    {
      icon: "wall",
      text: "Proposals",
      href: "/wall",
      separator: true,
      type: "in"
    },
    {
      icon: "twitter",
      text: "Twitter",
      href: "https://twitter.com/0xLobbyist",
      type: "out",
    },
    {
      icon: "discord",
      text: "Discord",
      href: "https://discord.com/invite/kEfvQZSPUk",
      type: "out",
    },
    {
      icon: "mirror",
      text: "Mirror",
      href: "https://mirror.xyz/0xa0a8aE81215644cC7cB1d8d2a06ce8B0F2887E29",
      type: "out",
    },
    {
      icon: "docs",
      text: "Docs",
      href: "https://vlabs-1.gitbook.io/lobbyist/",
      type: "out",
    },
  ];

  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.classList.toggle("is-active");
    document.body.classList.toggle("show-menu");
  };

  const pathNameArr = pathname.split("/");
  const isNew = pathNameArr[2] === "new";
  let pathNameProtocol = "";
  if (isNew) {
    pathNameProtocol = ["", pathNameArr[1], pathNameArr[3]].join("/");
  }

  const changeExchange = (currentChain: any, text: string) => {
    if (text != "qidao" && text != "aave") {
      switchNetwork(currentChain, library, chain);
    }
  }

  return (
    <Box
      className={classNames(
        "relative",
        styles.main,
        isMobile && styles.mainMobile
      )}
      component="aside"
    >
      <Box
        className={classNames(
          "flex w-80 mlgx:w-full h-full mlg flex-col-header justify-between sm:justify-start items-center group px-9",
          styles.mainInner
        )}
        component="section"
      >
        <Box>
          <Link
            to={PUBLIC_URL}
            className={classNames(
              "px-4 relative block mlg:px-0 mlgpt-12",
              styles.menuLogo
            )}
          >
            <img src={Logo} width="40" alt="" />
          </Link>
        </Box>
        <button
          className={classNames(
            "hamburger mlg:hidden hamburger--squeeze",
            styles.menuHamburger
          )}
          type="button"
          onClick={onButtonClick}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        <Box
          className={classNames(
            "flex flex-col-header pt-8 w-full overflow-auto",
            styles.menu,
            isMobile && styles.menuMobile
          )}
        >
          {links.map((link, idx) => {
            const isSelected =
              (link.href.length > 1 && 0 === pathname.indexOf(link.href)) ||
              (link.href.length > 1 &&
                0 === pathNameProtocol.indexOf(link.href)) ||
              (pathname.length === 1 && pathname === link.href);
            const linkColor = isSelected ? colors.tealLight : colors.white;

            return (
              <Box
                key={`lnk_${idx}`}
                className={`${link.type ? "relative" : ""}`}
              >
                {link.type == "out" ? (
                  <>
                    <a
                      key={`lnk_${idx}`}
                      href={link.href}
                      color={linkColor}
                      className={classNames("py-4 flex")}
                      target="_blank"
                      onClick={() => switchNetwork(`${link.chain}`, library, chain)}
                    >
                      <Box
                        component="span"
                        className={classNames("flex gap-2 items-center")}
                      >
                        <Box
                          component="span"
                          className={classNames(
                            "w-8 h-8 hidden mlg:flex items-center justify-center",
                            styles.menuIcon
                          )}
                        >
                          <SvgIcon
                            component={getIcon(link.icon)}
                            viewBox="0 0 31 31"
                          />
                        </Box>
                        <Typography
                          className={classNames(
                            "mlg:items-center",
                            styles.menuText
                          )}
                          variant="subtitle2"
                        >
                          {link.text}
                        </Typography>
                      </Box>
                    </a>
                  </>
                ) : link.type == "in" ? (
                  <>
                    <Link
                      key={`lnk_${idx}`}
                      to={link.href}
                      color={linkColor}
                      className={classNames("py-4 flex")}
                    >
                      <Box
                        component="span"
                        className={classNames("flex gap-2 items-center")}
                      >
                        <Box
                          component="span"
                          className={classNames(
                            "w-8 h-8 hidden mlg:flex items-center justify-center",
                            styles.menuIcon
                          )}
                        >
                          <SvgIcon
                            component={getIcon(link.icon)}
                            viewBox="0 0 31 31"
                          />
                        </Box>
                        <Typography
                          className={classNames(
                            "mlg:items-center",
                            styles.menuText
                          )}
                          variant="subtitle2"
                        >
                          {link.text}
                        </Typography>
                      </Box>
                    </Link>
                    {link.separator ? <Divider className="!my-4" /> : ""}

                  </>
                ) : ""}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export { SidebarMenu };
