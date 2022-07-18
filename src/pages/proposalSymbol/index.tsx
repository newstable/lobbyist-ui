import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import { CustomTabs as Tabs } from "../../components";
import { useSelector } from "../../redux/store";
import ActiveProposals from "./active";
import HistoryProposals from "./history";

type Props = {};

const tabs: string[] = ["Proposals", "History"];

const ProposalSymbol = (props: Props) => {
  let { symbol } = useParams();
  const proposalState = useSelector(state => state.proposal);
  const [tabIndex, setTabIndex] = useState(0);

  const paramSymbol = symbol ?? "";

  if (!paramSymbol) {
    // TODO: return to homepage
  }

  const handleTabChange = (event: React.SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return (
    <Box className="main-body flex flex-col grow">
      <Box className="flex flex-col min-h-full main-content gap-14">
        <Box className="flex justify-between">
          <Tabs tabIndex={tabIndex} tabs={tabs} setTabIndex={setTabIndex} />
          <Button
            variant="contained"
            component="a"
            color="tealLight"
            className="h-16"
            href={`/proposal/new/${symbol}`}
            startIcon={<ControlPointIcon />}
          >
            Create Proposal
          </Button>
        </Box>
        <SwipeableViews
          index={tabIndex}
          onChangeIndex={(index: number) => setTabIndex(index)}
        >
          <ActiveProposals symbol={paramSymbol} />
          <HistoryProposals symbol={paramSymbol} />
        </SwipeableViews>
      </Box>
    </Box>
  );
};

export default ProposalSymbol;
