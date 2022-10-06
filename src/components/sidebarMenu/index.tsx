import classNames from "classnames";
import { useEffect, useState } from "react";
import { Box, Typography, SvgIcon, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useLocation } from "react-router-dom";
import { MenuLink } from "../../@types";
import { ReactComponent as GaugeIcon } from "../../assets/icons/gauge.svg";
import { ReactComponent as WallIcon } from "../../assets/icons/wall.svg";
import { ReactComponent as ChartIcon } from "../../assets/icons/chart.svg";
import AuraIcon from "../../assets/icons/aura.svg";
import BeethovenxIcon from "../../assets/icons/beethovenx.svg";
import saddleIcon from "../../assets/icons/saddle.svg";
import ProAvaeIcon from "../../assets/icons/pro-aave.svg";
import CurveIcon from "../../assets/icons/crv.svg";
import BalancerIcon from "../../assets/icons/bal.svg";
import ProQiIcon from "../../assets/icons/pro-qidao.svg";
import { ReactComponent as ProFraxIcon } from "../../assets/icons/pro-frax.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { ReactComponent as DiscordIcon } from "../../assets/icons/discord.svg";
import { ReactComponent as MirrorIcon } from "../../assets/icons/mirror.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import ETHIcon from "../../assets/chains/eth.svg";
import OPIcon from "../../assets/chains/optimism.png";
import ARBIcon from "../../assets/chains/arbitrum.svg";
import POLIcon from "../../assets/chains/polygon.svg";
import FANTOMIcon from "../../assets/chains/fantom.png";
import AVAXIcon from "../../assets/chains/avax.png";
import BSCIcon from "../../assets/chains/bsc.png";
import Logo from "../../assets/icons/logo.svg";
import styles from "./styles.module.scss";
import './sidebarItem-Menu.scss';
import { colors } from "../../common";
import switchNetwork from "../header/switchchain";
import { useSelector } from "../../redux/store";
import { RootState } from "../../redux/store";
import { FlashOnRounded } from "@mui/icons-material";

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
      text: "Wall",
      href: "/wall",
      separator: true,
      type: "in"
    },
    {
      icon: ETHIcon,
      text: "Ethereum",
      href: "#",
      chain: 1,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 1,
          href: "/proposal/qidao",
        },
        {
          icon: AuraIcon,
          text: "Aura",
          chain: 1,
          href: "/proposal/aura",
        },
        {
          icon: saddleIcon,
          text: "Saddle",
          chain: 1,
          href: "/proposal/saddle",
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 1,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: OPIcon,
      text: "Optimism",
      href: "#",
      chain: 10,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 10,
          href: "/proposal/qidao",
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 10,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: ARBIcon,
      text: "Arbitrum",
      href: "#",
      chain: 42161,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 42161,
          href: "/proposal/qidao",
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 42161,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: POLIcon,
      text: "Polygon",
      href: "#",
      chain: 137,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 137,
          href: "/proposal/qidao",
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 137,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: FANTOMIcon,
      text: "Fantom",
      href: "#",
      chain: 250,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 250,
          href: "/proposal/qidao",
        },
        {
          icon: BeethovenxIcon,
          text: "Beethovenx",
          chain: 250,
          href: "/proposal/beethovenx"
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 250,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: AVAXIcon,
      text: "Avalanche",
      href: "#",
      chain: 43114,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 43114,
          href: "/proposal/qidao",
        },
        {
          icon: ProAvaeIcon,
          text: "Aave",
          chain: 43114,
          href: "/proposal/aave",
        },
      ]
    },
    {
      icon: BSCIcon,
      text: "Binance",
      href: "#",
      chain: 56,
      type: "chain",
      child: [
        {
          icon: ProQiIcon,
          text: "QiDAO",
          chain: 56,
          href: "/proposal/qidao",
        },
      ],
    },
    {
      icon: "twitter",
      text: "Twitter",
      href: "https://twitter.com/0xLobbyist",
      type: "out",
      separator: true
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

  const [ChainMenuState, SetChainMenuState] = useState(
    [
      { id: 1, state: false },
      { id: 10, state: false },
      { id: 56, state: false },
      { id: 137, state: false },
      { id: 250, state: false },
      { id: 42161, state: false },
      { id: 43114, state: false }
    ]
  )
  const OpenChainMenu = (item: MenuLink, index: Number) => {
    let menustate = ChainMenuState.map((menuitem, index) => { return { id: menuitem.id, state: menuitem.id === item.chain ? !menuitem.state : false }; }, []);
    SetChainMenuState(menustate);
  }

  const GetMenuState = (chain: any) => {
    let stateItem = ChainMenuState.find((item) => { return item.id === chain ? true : false });
    return stateItem?.state;
  }

  const setInitChild = () => {
    SetChainMenuState(
      [
        { id: 1, state: false },
        { id: 10, state: false },
        { id: 56, state: false },
        { id: 137, state: false },
        { id: 250, state: false },
        { id: 42161, state: false },
        { id: 43114, state: false }
      ]
    )
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
            <img src={Logo} width="95" alt="" />
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
            "flex flex-col-header pt-8 w-full",
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
                {link.type == "chain" ? (
                  <>
                    <button
                      key={`lnk_${idx}`}
                      className={`${classNames("py-4 flex")}`}
                      onClick={() => { OpenChainMenu(link, idx) }}
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
                          <img
                            width="30"
                            src={link.icon}
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
                    </button>
                    {
                      GetMenuState(link.chain) ? !link.childtype ?
                        <div className="protocol-modal">
                          <Box className="sidebarItem-MenuChain">
                            {
                              link.child?.map((children, Idx) => {
                                return (
                                  <Link
                                    onClick={() => { setInitChild(); switchNetwork(`${link.chain}`, library, chain) }}
                                    key={`lnk_${Idx}`}
                                    to={children.href}
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
                                          component={getIcon(children.icon)}
                                          viewBox="0 0 31 31"
                                        />
                                        <img src={children.icon} width="30"></img>
                                      </Box>
                                      <Typography
                                        className={classNames(
                                          "mlg:items-center",
                                          styles.menuText
                                        )}
                                        variant="subtitle2"
                                      >
                                        {children.text}
                                      </Typography>
                                    </Box>
                                  </Link>
                                )
                              })
                            }
                          </Box>
                        </div>
                        : '' : ""
                    }
                  </>
                ) : link.type == "out" ? (
                  <>
                    {link.separator ? <Divider className="!my-4" /> : ""}
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
