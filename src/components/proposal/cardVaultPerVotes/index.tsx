import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import NumberType from "../../../common/number";
import { Tokens } from "../../../token";
import { TextContent, TextHead } from "../../text";
type Props = {
    proposal: Proposal;
};

const Content = styled(CardContent)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardPerVotes = ({ proposal }: Props) => {
    const colHeads = ["Min Rewards", "Per Votes"];
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
                <Box className="grid grid-cols-2 gap-8">
                    <Typography variant="subtitle1">{NumberType((proposal.reward / (proposal.targetVotes / proposal.minVotes)).toFixed(3), 3) + " " + rewardCurrency[0].display}</Typography>
                    <Typography variant="subtitle1">{proposal.minVotes}</Typography>
                </Box>
            </Content>
        </Card>
    );
};

ProposalCardPerVotes.defaultProps = {
    isProposer: false,
};

export { ProposalCardPerVotes };
