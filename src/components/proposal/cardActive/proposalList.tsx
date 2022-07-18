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

interface Props {
  proposals: Proposal[];
  heads: string[];
}

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalListCard: React.FC<Props> = ({ proposals, heads }) => {
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
        {proposals.map((p, idx) => (
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
                <TextContent>{p.protocol.name}</TextContent>
              </Box>
              <Box
                className={classNames("flex flex-col", !isAboveMd && "gap-1")}
              >
                <TextHead className={classNames(isAboveMd && "hidden")}>
                  {heads[1]}
                </TextHead>
                <TextContent>$56,000</TextContent>
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
                <TextContent>12,500</TextContent>
              </Box>
              <Box
                className={classNames("flex flex-col", !isAboveMd && "gap-1")}
              >
                <TextHead className={classNames(isAboveMd && "hidden")}>
                  {heads[3]}
                </TextHead>
                <TextContent>$0.07</TextContent>
              </Box>
              <Box
                className={classNames("flex", isAboveMd && "justify-center")}
              >
                <Button variant="contained" color="tealLight">
                  View
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Content>
  );
};

export default ProposalListCard;
