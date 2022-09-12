import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";

type Props = {
  proposal: Proposal;
  isProposer?: boolean | string | null;
  voteWeight: number;
  voteType: string;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultReward = ({ proposal, isProposer, voteWeight, voteType }: Props) => {
  const colHeads = isProposer
    ? ["My Reward", "Voting For"]
    : ["My Reward Amount", "Voting For"];
  return (
    <Card className="" elevation={0}>
      <Content className="card-rnd">
        <Box className="grid grid-cols-2 gap-8">
          {colHeads.map((c, idx) => (
            <Box key={`colHead_${idx}`}>
              <TextHead>{c}</TextHead>
            </Box>
          ))}
        </Box>
        <Box className="grid grid-cols-2 gap-8">
          <TextContent>${proposal.totalVoteWeight > 0 ? NumberType((proposal.usdAmount / proposal.totalVoteWeight * voteWeight).toFixed(2)) : 0}</TextContent>
          <TextContent>{voteType != "single-choice" ? "100% for " + proposal.protocol : proposal.protocol}</TextContent>
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultReward.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultReward };
