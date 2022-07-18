import { Box, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import {
  EnumProposalKpi,
  EnumProposalType,
} from "../../../../../@types/proposal";
import { EnumProtocolName } from "../../../../../@types/protocol";

type Props = {};

type NavItem = {
  title: string;
  href: string;
};

const BreadCrumb = (props: Props) => {
  const { protocol, prsalType, kpi, status } = useParams();
  const items: NavItem[] = [];

  let locPrefix = "/proposal/new";

  if (protocol) {
    locPrefix = `${locPrefix}/${protocol}`;
    items.push({
      title: EnumProtocolName[protocol as keyof typeof EnumProtocolName],
      href: locPrefix,
    });
  }
  if (prsalType) {
    locPrefix = `${locPrefix}/${prsalType}`;
    items.push({
      title: EnumProposalType[prsalType as keyof typeof EnumProposalType],
      href: `${locPrefix}/${prsalType}`,
    });
  }
  if (kpi) {
    if (kpi !== "form") {
      locPrefix = `${locPrefix}/${kpi}`;
      items.push({
        title: EnumProposalKpi[kpi as keyof typeof EnumProposalKpi],
        href: `${locPrefix}/${kpi}`,
      });
    }
    items.push({
      title: "Proposal Paramters",
      href: "",
    });
  }

  if (status) {
    items.push({
      title: "Overview",
      href: "",
    });
  }

  return (
    <Box className="flex flex-wrap gap-2">
      {items.map((nav, idx) => (
        <Box className="flex gap-2 " key={`brd_${idx}`}>
          <Typography>{nav.title}</Typography>
          {idx + 1 < items.length && <Typography>{">"}</Typography>}
        </Box>
      ))}
    </Box>
  );
};

export { BreadCrumb };
