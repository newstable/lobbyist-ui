import { Card } from "@mui/material";
import { useSelector } from "../../../redux/store";
import { ProposalCardHeader } from "../cardHeader";
import ProposalListCard from "./proposalList";
import { useParams } from "react-router-dom";


type Props = {};

const ProposalCardActive = (props: Props) => {
  let { symbol } = useParams();
  const colHeads = ["Title", "Vote Incentives", "Total Votes", "$/Vote", ""];

  const proposalState = useSelector(state => state.proposal);
  // @ts-ignore
  const activeProposals = proposalState.currentProposal.data;
  return (
    <Card className="">
      <ProposalCardHeader title="My active proposals"></ProposalCardHeader>
      <ProposalListCard proposals={activeProposals} heads={colHeads} />
    </Card>
  );
};

export { ProposalCardActive };
