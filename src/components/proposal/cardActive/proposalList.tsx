import React from "react";
import classNames from "classnames";
import {
  CardContent,
  Box,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { EnumProtocolSymbolName } from "../../../@types/protocol";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import { useSelector, RootState } from "../../../redux/store";
import NumberType from "../../../common/number";
import { useNavigate } from "react-router-dom";

interface Props {
  proposals: Proposal[];
  heads: string[];
}

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalListCard: React.FC<Props> = ({ proposals, heads }) => {
  const navigate = useNavigate();
  const onJoinClick = (proposal: Proposal, idx: number) => {
    const path = idx % 2 === 0 ? "vote" : "vote?proposer=1";
    navigate(path, {
      state: {
        proposal,
      },
    });
  };
  const walletAddress: any = useSelector(
    (state: RootState) => state.wallet.address
  );
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));

  return (
    <Content className="!p-0">
      <Box
        className={classNames(
          "grid grid-cols-5 gap-8 px-6 mb-8",
          !isAboveMd && "hidden"
        )}
      >
        {heads.map((c, idx) => (
          <Box key={`colHead_${idx}`}>
            <TextHead>{c}</TextHead>
          </Box>
        ))}
      </Box>
      <Box className="flex flex-col gap-4">
        {proposals?.map((p, idx) => (
          p.address === walletAddress ?
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
                    {heads[0]}
                  </TextHead>
                  <TextContent>{p.name}</TextContent>
                </Box>
                <Box
                  className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                >
                  <TextHead className={classNames(isAboveMd && "hidden")}>
                    {heads[1]}
                  </TextHead>
                  <TextContent>${NumberType(p.reward.toString())}</TextContent>
                </Box>
                <Box
                  className={classNames(
                    "flex flex-col",
                    !isAboveMd && "gap-1 col-span-3"
                  )}
                >
                  <TextHead className={classNames(isAboveMd && "hidden")}>
                    {heads[2]}
                  </TextHead>
                  <TextContent>{NumberType(p.votes.toString())}</TextContent>
                </Box>
                <Box
                  className={classNames("flex flex-col", !isAboveMd && "gap-1")}
                >
                  <TextHead className={classNames(isAboveMd && "hidden")}>
                    {heads[3]}
                  </TextHead>
                  <TextContent>${p.reward / p.votes}</TextContent>
                </Box>
                <Box
                  className={classNames("flex", isAboveMd && "justify-center")}
                >
                  <Button variant="contained" color="tealLight" onClick={() => onJoinClick(p, idx)}>
                    View
                  </Button>
                </Box>
              </Box>
            </Box> : <></>
        ))}
      </Box>
    </Content>
  );
};

export default ProposalListCard;
