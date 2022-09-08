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

type Props = {
  proposals: Proposal[],
  address: string
};

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalCardCreated = (props: Props) => {
  const { proposals, address } = props
  let { symbol } = useParams();
  const colHeads = ["Title", "Vote Incentives", "Total Votes", "$/Vote", ""];
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
    <Card className="">
      <ProposalCardHeader title="My created proposals"></ProposalCardHeader>
      <Content className="!p-0">
        <Box
          className={classNames(
            "grid grid-cols-5 gap-8 px-6 mb-8",
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
                      isAboveMd ? "grid-cols-5" : "grid-cols-2"
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
                      <TextContent>${NumberType(p.reward)}</TextContent>
                    </Box>
                    <Box
                      className={classNames(
                        "flex flex-col",
                        !isAboveMd && "gap-1 col-span-3"
                      )}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[2]}
                      </TextHead>
                      <TextContent>{NumberType(p.votes)}</TextContent>
                    </Box>
                    <Box
                      className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                    >
                      <TextHead className={classNames(isAboveMd && "hidden")}>
                        {colHeads[3]}
                      </TextHead>
                      <TextContent>${p.votes == 0 ? ("0") : (
                        (p.reward / p.votes).toFixed(2)
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
