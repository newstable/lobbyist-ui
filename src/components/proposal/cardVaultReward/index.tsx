import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";
import { useEffect, useState } from "react";

type Props = {
  proposal: Proposal;
  isProposer?: boolean | string | null;
  voteWeight: number;
  voteType: string;
};

const NA = ['st', 'nd', 'rd', 'th'];
const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardVaultReward = ({ proposal, isProposer, voteWeight, voteType }: Props) => {
  const [choice, setChoice] = useState<string[]>([]);
  useEffect(() => {
    if (JSON.parse(proposal.protocol).type != "single-choice" || JSON.parse(proposal.protocol).type != "basic") {
      var str = proposal?.choice?.split("&");
      setChoice(str);
    }
    console.log(JSON.parse(proposal.protocol).type);
  }, [proposal])

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
          <Typography variant="subtitle1">${proposal.totalVoteWeight > 0 ? proposal.myvoteAmount ? NumberType((proposal.usdAmount / proposal.totalVoteWeight * proposal.myvoteAmount).toFixed(2), 2) : 0 : 0}</Typography>
          <Typography variant="subtitle1">{choice?.map((mychoice, Index: number) => {
            return (
              <>
                {JSON.parse(proposal.protocol).type == "ranked-choice" ? `(${Index + 1}${Index >= 0 && Index < 4 ? NA[Index] : 'th'}) ` + mychoice : "" + mychoice}<br />
              </>
            )
          })}</Typography>
        </Box>
      </Content>
    </Card>
  );
};

ProposalCardVaultReward.defaultProps = {
  isProposer: false,
};

export { ProposalCardVaultReward };
