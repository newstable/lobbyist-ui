import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import { ProposalCardHeader } from "../cardHeader";

type Props = {
  proposal: Proposal;
  isProposer?: boolean | string | null;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultIncentive = ({ proposal, isProposer }: Props) => {
  const colHeads = isProposer
    ? ["Total Vote Weight"]
    : ["Total Vote Weight", "My Vote Weight"];
  return (
    <Card className="">
      <ProposalCardHeader title="Vault Incentive Gauge"></ProposalCardHeader>
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
          {!isProposer && <TextContent>{`${""}`}</TextContent>}
          {/* {!isProposer && <TextContent>{`${proposal.userVote}`}</TextContent>} */}
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultIncentive.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultIncentive };
