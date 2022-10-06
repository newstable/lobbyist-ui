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
  1: "../../assets/chains/eth.svg",
  10: "../../assets/chains/optimism.png",
  56: "../../assets/chains/bsc.png",
  137: "../../assets/chains/polygon.svg",
  250: "../../assets/chains/fantom.png",
  42161: "../../assets/chains/arbitrum.svg",
  43114: "../../assets/chains/avax.png"
}

type Props = {
  proposals: Proposal[],
  address: string
};

const Content = styled(CardContent)(({ theme }) => ({}));

const Text_Head = styled(TextHead)(({ theme }) => ({
  fontSize: "100%"
}))
const ProposalCardCreated = (props: Props) => {
  const { proposals, address } = props
  let { symbol } = useParams();
  const colHeads = ["Chain", "Title", "Voting For", "Rewards", "Votes", "$/Vote", ""];
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
            "grid grid-cols-custom-7 gap-8 px-6 mb-8 dp:hidden"
          )}
        >
          {colHeads.map((c, idx) => (
            <Box key={`colHead_${idx}`}>
              <Text_Head>{c}</Text_Head>
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
                      isAboveMd ? "grid-cols-custom-7" : "grid-cols-2"
                    )}
                  >
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[0]}
                      </Text_Head>
                      <img width="40" src={ChainImg[p.chain]}></img>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[1]}
                      </Text_Head>
                      <TextContent>{p.name.length > 23 ? (p.name.slice(0, 23) + "...") : p.name}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[2]}
                      </Text_Head>
                      <TextContent>{p.protocol.length > 23 ? (p.protocol.slice(0, 23) + "...") : p.protocol}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[3]}
                      </Text_Head>
                      <TextContent>${NumberType(p.usdAmount.toFixed(2), 2)}</TextContent>
                    </Box>
                    <Box
                      className={classNames(
                        "flex flex-col",
                        !isAboveMd && "gap-1 col-span-3"
                      )}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[4]}
                      </Text_Head>
                      <TextContent>{NumberType(p.totalVoteWeight.toFixed(2), 2)}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <Text_Head className={classNames(isAboveMd && "hidden")}>
                        {colHeads[5]}
                      </Text_Head>
                      <TextContent>${p.totalVoteWeight == 0 ? ("0") : (
                        NumberType((p.usdAmount / p.totalVoteWeight).toFixed(6), 6)
                      )}</TextContent>
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
