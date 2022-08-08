import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  ProtocolList,
  ProposalType,
  ProposalKpi,
  ProposalForm,
  ProposalPreview,
  ProposalConfirm,
} from "./partials";
import { PageHeader } from "./partials/common";
import { useEffect } from "react";

type Props = {};

const ProposalNewPage = (props: Props) => {
  const { protocol, prsalType, kpi, status } = useParams();


  return (
    <Box className="main-body flex flex-col grow">
      <Box className="flex flex-col min-h-full main-content gap-14">
        <PageHeader />
        <Box>
          {prsalType && protocol && kpi && status ? (
            status === "preview" ? (
              <ProposalPreview />
            ) : (
              <ProposalConfirm />
            )
          ) : prsalType && protocol && kpi ? (
            <ProposalForm name={protocol} />
          ) : prsalType && protocol ? (
            <ProposalKpi />
          ) : protocol ? (
            <ProposalType />
          ) : (
            <ProtocolList />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProposalNewPage;
