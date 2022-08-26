import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";

type Props = {
  proposal: Proposal;
  isProposer?: boolean | string | null;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultReward = ({ proposal, isProposer }: Props) => {
  const colHeads = isProposer
    ? ["Total rewards to distribute"]
    : ["My Reward Amount", "Voting For"];
  return (
    <Card className="">
      <Content>
        <Box className="grid grid-cols-2 gap-8">
          {colHeads.map((c, idx) => (
            <Box key={`colHead_${idx}`}>
              <TextHead>{c}</TextHead>
            </Box>
          ))}
        </Box>
        <Box className="grid grid-cols-2 gap-8">
          <TextContent>${proposal.totalValue}</TextContent>
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultReward.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultReward };
