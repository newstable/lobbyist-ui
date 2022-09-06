import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { colors } from "../../common";
import { ProposalCardHeader } from "../proposal";
import { TextHead } from "../text";
import { useEffect, useState } from "react";
import { Proposal, ActiveProposal } from "../../@types/proposal";

type Props = {
  proposals: ActiveProposal[];
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.tealLight.main,
  borderRadius: "1rem",
}));

const CardRewards = (props: Props) => {
  const { proposals } = props;
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));
  const cols = [
    { title: "Estimated Rewards" },
    { title: "Active Proposals" },
    { title: "Total Earned" },
  ];
  const data = [
    { value: "$28,912", },
    { value: 3 },
    { value: "16" }
  ]
  useEffect(() => {
    data[1].value = proposals.length;
    console.log(data);
  }, [proposals])
  return (
    <Card className="">
      <ProposalCardHeader title="My total rewards"></ProposalCardHeader>
      <Content
        className={classNames(
          "grid gap-8",
          isAboveMd ? "grid-cols-3" : "grid-cols-1"
        )}
      >
        {cols.map((c, idx) => (
          <Box
            key={`col_${idx}`}
            className={classNames(
              "flex flex-col",
              isAboveMd ? "gap-5" : "gap-1"
            )}
          >
            <TextHead color={colors.white}>{c.title}</TextHead>
            <Typography variant="h5" color="white" className="!font-bold">
              {data[idx].value}
            </Typography>
          </Box>
        ))}
      </Content>
    </Card>
  );
};

export { CardRewards };
