import {
  Card,
  CardContent,
  Box,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import classNames from "classnames";
import { ProposalCardHeader } from "../cardHeader";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import { useParams } from "react-router-dom";
import NumberType from "../../../common/number";

const ChainImg: any = {
  1: "../../assets/chains/ethereum.svg",
  10: "../../assets/chains/optimism.svg",
  56: "../../assets/chains/bsc.svg",
  137: "../../assets/chains/polygon.svg",
  250: "../../assets/chains/fantom.svg",
  42161: "../../assets/chains/arbitrum.svg",
  43114: "../../assets/chains/avalanche.svg"
}

type Props = {
  proposals: Proposal[],
  address: string
};

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalCardCreated = (props: Props) => {
  const { proposals, address } = props
  let { symbol } = useParams();
  const colHeads = ["Title", "Voting For", "Vote Incentives", "Total Votes", "$/Vote", "Chain", ""];
  const navigate = useNavigate();
  const onJoinClick = (proposal: Proposal) => {
    const path = proposal.address !== address ? "proposal/" + proposal.type + "/vote" : "proposal/" + proposal.type + "/vote?proposer=1";
    navigate(path, {
      state: {
        proposal,
      },
    });
  };
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));
  return (
    <Card className="" elevation={0}>
      <ProposalCardHeader title="My created proposals"></ProposalCardHeader>
      <Content className="!p-0">
        <Box
          className={classNames(
            "grid grid-cols-7 gap-8 px-6 mb-8",
            !isAboveMd && "hidden"
          )}
        >
          {colHeads.map((c, idx) => (
            <Box key={`colHead_${idx}`}>
              <TextHead>{c}</TextHead>
            </Box>
          ))}
        </Box>
        <Box className="flex flex-col gap-4">
          {proposals?.map((p, idx) => (
            p.address === address ?
              !p.isClosed ?
                <Box key={`prop_${idx}`} className="p-6 bg-black rounded-md">
                  <Box
                    className={classNames(
                      "grid gap-8",
                      isAboveMd ? "grid-cols-7" : "grid-cols-2"
                    )}
                  >
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[0]}
                      </TextHead>
                      <TextContent>{p.name.length > 20 ? (p.name.slice(0, 20) + "...") : p.name}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[1]}
                      </TextHead>
                      <TextContent>{p.protocol}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[2]}
                      </TextHead>
                      <TextContent>${NumberType(p.usdAmount.toFixed(2), 2)}</TextContent>
                    </Box>
                    <Box
                      className={classNames(
                        "flex flex-col",
                        !isAboveMd && "gap-1 col-span-3"
                      )}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[3]}
                      </TextHead>
                      <TextContent>{NumberType(p.totalVoteWeight.toFixed(2), 2)}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[4]}
                      </TextHead>
                      <TextContent>${p.totalVoteWeight == 0 ? ("0") : (
                        NumberType((p.usdAmount / p.totalVoteWeight).toFixed(6), 6)
                      )}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[5]}
                      </TextHead>
                      <img width="40" src={ChainImg[p.chain]}></img>
                    </Box>
                    <Box
                      className={classNames("flex", isAboveMd && "justify-center")}
                    >
                      <Button variant="contained" color="tealLight" onClick={() => onJoinClick(p)}>
                        View
                      </Button>
                    </Box>
                  </Box>
                </Box> : <></> : <></>
          ))}
        </Box>
      </Content>
    </Card>
  );
};

export { ProposalCardCreated };
