import { Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";
import tokens from "../../../token.json";
import { colors } from "../../../common";

type Props = {
  proposal: Proposal;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultEmission = ({ proposal }: Props) => {
  const colHeads = ["Total Reward", "$/Vote"];
  var rewardCurrency = tokens.filter(token => token.address == proposal.rewardCurrency);
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
          <TextContent>${NumberType(proposal.usdAmount.toFixed(2))}</TextContent>
          <TextContent>{proposal.totalVoteWeight == 0 ? 0 : "$" + NumberType((proposal.usdAmount / proposal.totalVoteWeight).toFixed(6))}</TextContent>
        </Box>
        <Box className="grid grid-cols-2 gap-8" style={{ color: "#3a78ff" }}>
          <TextContent>{NumberType(proposal.reward.toFixed(2)) + " " + rewardCurrency[0].display}</TextContent>
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultEmission.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultEmission };
