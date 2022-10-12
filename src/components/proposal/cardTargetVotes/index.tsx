import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import NumberType from "../../../common/number";
import { TextContent, TextHead } from "../../text";
type Props = {
    proposal: Proposal;
};

const Content = styled(CardContent)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

const ProposalCardTargetVotes = ({ proposal }: Props) => {
    const colHeads = ["Target Votes", "Max Rewards"];
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
                    <Typography variant="subtitle1">{proposal.targetVotes}</Typography>
                    <Typography variant="subtitle1">{proposal.reward}</Typography>
                </Box>
            </Content>
        </Card>
    );
};

ProposalCardTargetVotes.defaultProps = {
    isProposer: false,
};

export { ProposalCardTargetVotes };
