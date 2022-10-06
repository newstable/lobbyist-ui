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
import { ReactComponent as ProAvaeIcon } from "../../assets/icons/pro-aave.svg";
import { ReactComponent as CurveIcon } from "../../assets/icons/crv.svg";
// import { ReactComponent as ConvexIcon } from "../../assets/icons/convex.svg";
import { ReactComponent as BalancerIcon } from "../../assets/icons/bal.svg";
import { ReactComponent as ProQiIcon } from "../../assets/icons/pro-qidao.svg";
import { ReactComponent as ProVesqIcon } from "../../assets/icons/vesq.svg";
import { ReactComponent as ProFraxIcon } from "../../assets/icons/pro-frax.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord.svg";
import { ReactComponent as MirrorIcon } from "../../assets/icons/mirror.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.scss";
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
      case "pro-aave":
        return ProAvaeIcon;
      case "pro-frax":
        return ProFraxIcon;
      case "curve":
        return CurveIcon;
      // case "convex":
      //   return ConvexIcon;
      case "balancer":
        return BalancerIcon;
      case "pro-qidao":
        return ProQiIcon;
      case "pro-vesq":
        return ProVesqIcon;
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
    },
    {
      icon: "wall",
      text: "Wall",
      href: "/wall",
    },
    {
      icon: "",
      text: "Ethereum",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 1,
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Optimism",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 10,
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Arbitrum",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 42161,
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Polygon",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 137,
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Fantom",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      chain: 250,
      text: "QiDAO",
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Avalanche",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 43114,
      href: "/proposal/qidao",
    },
    {
      icon: "",
      text: "Binance",
      href: "#",
      disabled: true,
    },
    {
      icon: "pro-qidao",
      text: "QiDAO",
      chain: 56,
      href: "/proposal/qidao",
    },
    // {
    //   icon: "pro-aave",
    //   text: "Aave",
    //   href: "/proposal/aave",
    //   separator: true,
    // },
    {
      icon: "",
      text: "Mumbai",
      href: "#",
      disabled: true
    },
    {
      icon: "pro-vesq",
      text: "Vesq",
      chain: 137,
      href: "/proposal/vesq",
      separator: true,
    },
    {
      icon: "twitter",
      text: "Twitter",
      href: "https://twitter.com/0xLobbyist",
      out: true,
    },
    {
      icon: "discord",
      text: "Discord",
      href: "https://discord.com/invite/kEfvQZSPUk",
      out: true,
    },
    {
      icon: "mirror",
      text: "Mirror",
      href: "https://mirror.xyz/0xa0a8aE81215644cC7cB1d8d2a06ce8B0F2887E29",
      out: true,
    },
    {
      icon: "docs",
      text: "Docs",
      href: "https://vlabs-1.gitbook.io/lobbyist/",
      out: true,
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
          "flex h-24 w-80 items-center justify-between mlgx:w-full h-full mlg flex-col-header justify-start items-start group px-9 ",
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
            <img src={Logo} alt="" />
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
            "flex flex-col-header pt-8",
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
                className={link.disabled ? "relative" : ""}
              >
                {link.disabled ? (
                  <><Divider className="!my-4" />
                    <div
                      style={{ color: "gray" }}
                      className="!p-0 mlg:!justify-start !py-4 text-xl"
                    >
                      {link.text}
                    </div>
                  </>
                ) : link.out ? (
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
                ) : (
                  <Link
                    key={`lnk_${idx}`}
                    to={link.href}
                    color={linkColor}
                    className={classNames("py-4 flex")}
                    onClick={(event: any) => { switchNetwork(`${link.chain}`, library, chain) }}
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
                )}
                {link.separator && <Divider className="!my-4" />}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export { SidebarMenu };
