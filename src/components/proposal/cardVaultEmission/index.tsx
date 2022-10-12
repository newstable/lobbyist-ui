import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";
import { Tokens } from "../../../token";
import { colors } from "../../../common";

type Props = {
  proposal: Proposal;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultEmission = ({ proposal }: Props) => {
  let colHeads;
  if (proposal.proposalType == "variable") {
    colHeads = ["Current Reward", "$/Vote"];
  } else {
    colHeads = ["Total Reward", "$/Vote"];
  }
  var rewardCurrency = Tokens[proposal.chain].filter(
    (token: any) => token.address == proposal.rewardCurrency
  );
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
        {proposal.proposalType == "variable" ? (
          <Box className="grid grid-cols-2 gap-8">
            <Typography variant="subtitle1">
              {NumberType((proposal.totalVoteWeight * proposal.reward / proposal.targetVotes * 0.975).toFixed(4), 4) +
                " " +
                rewardCurrency[0].display}
            </Typography>
            <Typography variant="subtitle1">
              {proposal.totalVoteWeight == 0
                ? 0
                : "$" +
                NumberType(
                  (proposal.usdAmount / proposal.totalVoteWeight).toFixed(6),
                  6
                )}
            </Typography>
          </Box>
        ) : (
          <>
            <Box className="grid grid-cols-2 gap-8">
              <Typography variant="subtitle1">
                ${NumberType(proposal.usdAmount.toFixed(2), 2)}
              </Typography>
              <Typography variant="subtitle1">
                {proposal.totalVoteWeight == 0
                  ? 0
                  : "$" +
                  NumberType(
                    (proposal.usdAmount / proposal.totalVoteWeight).toFixed(6),
                    6
                  )}
              </Typography>
            </Box>
            <Box className="grid grid-cols-2 gap-8" style={{ color: "#3a78ff" }}>
              <Typography variant="subtitle1">
                {NumberType(proposal.reward.toFixed(2), 2) +
                  " " +
                  rewardCurrency[0].display}
              </Typography>
            </Box>
          </>
        )}
      </Content>
    </Card>
  );
};

ProposalCardVaultEmission.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultEmission };
