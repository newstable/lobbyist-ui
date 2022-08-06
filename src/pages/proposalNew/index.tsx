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
import { useQuery } from "@apollo/client";
import { PageHeader } from "./partials/common";
import { GET_PROPOSAL, GET_Follows, GET_SPACES, GET_VOTE } from "../../gql";
import { useEffect } from "react";

type Props = {};

const ProposalNewPage = (props: Props) => {
  const { protocol, prsalType, kpi, status } = useParams();

  const {
    data: snapShotData,
    loading: snapShotLoading,
    error: snapShotError,
  } = useQuery(GET_PROPOSAL, {
    pollInterval: 0,
  });

  useEffect(() => {
    console.log(snapShotData, "adfadfs");
  })

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
            <ProposalForm {...snapShotData} />
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
