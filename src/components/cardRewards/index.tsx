import { Card, CardContent, Box, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import classNames from "classnames";
import { colors } from "../../common";
import { ProposalCardHeader } from "../proposal";
import { TextHead } from "../text";
import { useEffect, useState } from "react";
import { Proposal } from "../../@types/proposal";
import { Coins } from "../../blockchain";
import tokens from "../../token.json";

type Props = {
  activeProposals: Proposal[];
  address: string;
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.tealLight.main,
  borderRadius: "1rem",
}));

const CardRewards = (props: Props) => {
  const { activeProposals, address } = props;
  const [proposalCount, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [earn, setEarn] = useState(0);
  const theme = useTheme();
  const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));
  const cols = [
    { title: "Pending Rewards" },
    { title: "Total Earned" },
    { title: "Active Proposals" },
  ];
  const data = [
    { value: `$${price.toFixed(2)}` },
    { value: `$${earn.toFixed(2)}` },
    { value: proposalCount }
  ]
  useEffect(() => {
    const getActiveArray = activeProposals?.filter(element => element.myclaim == false);
    const getMyArray = activeProposals?.filter(element => element.myclaim);
    var pendingreward = 0;
    var totalEarned = 0;
    setCount(getActiveArray?.length);
    getMyArray?.forEach(async (item) => {
      // item.usdAmount;
      // var rewardCurrency = tokens.filter(token => token.address == item.rewardCurrency);
      // var amount = await Coins(rewardCurrency[0]?.api);
      if (!item.myclaim) {
        pendingreward += item.reward * item.usdAmount / item.totalVoteWeight * item.myvoteAmount;
      } else {
        totalEarned += item.reward * item.usdAmount / item.totalVoteWeight * item.myvoteAmount;
      }
      setPrice(pendingreward);
      setEarn(totalEarned);
    })
  }, [activeProposals, address])
  return (
    <Card className="">
      <ProposalCardHeader title="My Stats"></ProposalCardHeader>
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
