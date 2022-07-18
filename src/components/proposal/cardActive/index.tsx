import { Card } from "@mui/material";
import { useSelector } from "../../../redux/store";
import { ProposalCardHeader } from "../cardHeader";
import ProposalListCard from "./proposalList";

type Props = {};

const ProposalCardActive = (props: Props) => {
  const colHeads = ["Title", "Vote Incentives", "Total Votes", "$/Vote", ""];

  const proposalState = useSelector(state => state.proposal);
  const { activeProposals } = proposalState;
  return (
    <Card className="">
      <ProposalCardHeader title="My active proposals"></ProposalCardHeader>
      <ProposalListCard proposals={activeProposals} heads={colHeads} />
    </Card>
  );
};

export { ProposalCardActive };
