import { FunctionComponent, SVGProps } from "react";
import { useParams, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Box, SvgIcon, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dash.svg";
import { ReactComponent as ProQidaoIcon } from "../../assets/icons/pro-qidao.svg";
import { ReactComponent as ProAaveIcon } from "../../assets/icons/pro-aave.svg";
import { ReactComponent as ProVesqIcon } from "../../assets/icons/vesq.svg";
import { ReactComponent as ConvexIcon } from "../../assets/icons/convex.svg";
import { EnumProtocolName } from "../../@types/protocol";
import styles from "./styles.module.scss";

type Props = {};

const HeaderLeft = (props: Props) => {
  const { symbol, protocol, prsalType, kpi, status } = useParams();
  const location = useLocation();

  const locationArr = location.pathname.split("/").filter(p => p.length);

  let title = "Dashboard";
  let subtitle = "";
  let TitleIcon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  > = () => <DashboardIcon viewBox="0 0 45 45" className={styles.iconGauge} />;

  if (symbol) {
    title = EnumProtocolName[symbol as keyof typeof EnumProtocolName];
    switch (title) {
      case EnumProtocolName.convex:
        TitleIcon = ConvexIcon;
        break;
      case EnumProtocolName.qidao:
        TitleIcon = ProQidaoIcon;
        break;
      case EnumProtocolName.aave:
        TitleIcon = ProAaveIcon;
        break;
      case EnumProtocolName.vesq:
        TitleIcon = ProVesqIcon;
        break;
      default:
        break;
    }
  }
  if (locationArr[0] === "proposal") {
    const isNew = locationArr[1] === "new";
    if (isNew) {
      TitleIcon = () => (
        <AddIcon className={classNames("text-2xl zinc-900", styles.iconAdd)} />
      );
      title = "Create a proposal";
      subtitle =
        protocol && prsalType && kpi && status
          ? status === "confirm"
            ? "Proposal created successfully"
            : "Check your information is correct"
          : protocol && prsalType && kpi
            ? "Add information about your proposal"
            : protocol && prsalType
              ? "Select the KPI option to use for payout"
              : protocol
                ? "Create a gauge vote or governance proposal"
                : "Choose protocol to create proposal for";
    }
  }
  return (
    <Box className={classNames("flex items-center gap-4")}>
      <Box
        className={classNames(
          "flex items-center justify-center rounded-full w-16 h-16",
          styles.icon,
          symbol && styles.iconSymbol
        )}
      >
        <SvgIcon
          className={styles.icon}
          component={TitleIcon}
          viewBox="0 0 31 31"
        />
      </Box>
      <Box>
        <Typography variant="h4">{title}</Typography>
        {subtitle && <Typography variant="h6">{subtitle}</Typography>}
      </Box>
    </Box>
  );
};

export { HeaderLeft };
