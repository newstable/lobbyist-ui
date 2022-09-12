import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";

type Props = {
  proposal: Proposal;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultEmission = ({ proposal }: Props) => {
  const colHeads = ["Total Reward", "$/Vote"];
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
          <TextContent>${proposal.usdAmount.toFixed(2)}</TextContent>
          <TextContent>{proposal.votes == 0 ? 0 : "$" + (proposal.usdAmount / proposal.votes).toFixed(2)}</TextContent>
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultEmission.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultEmission };
