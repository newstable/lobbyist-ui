import { Card } from "@mui/material";
import { useSelector } from "../../../redux/store";
import ProposalListCard from "../cardActive/proposalList";
import { ProposalCardHeader } from "../cardHeader";
import { useParams } from "react-router-dom";

type Props = {};

const ProposalCardCreated = (props: Props) => {
  let { symbol } = useParams();
  const colHeads = ["Title", "Vote Incentives", "Total Votes", "$/Vote", ""];

  const proposalState = useSelector(state => state.proposal);
  // @ts-ignore
  const activeProposals = proposalState.currentProposal[symbol];
  return (
    <Card className="">
      <ProposalCardHeader title="My created proposals"></ProposalCardHeader>
      <ProposalListCard proposals={activeProposals} heads={colHeads} />
    </Card>
  );
};

export { ProposalCardCreated };
