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
};

const Content = styled(CardContent)(({ theme }) => ({
  backgroundColor: theme.palette.tealLight.main,
  borderRadius: "1rem",
}));

const CardRewards = (props: Props) => {
  const { activeProposals } = props;
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
    console.log(activeProposals);
    const getActiveArray = activeProposals?.filter(element => element.myclaim == false);
    var pendingreward = 0;
    var totalEarned = 0;
    setCount(getActiveArray?.length);
    getActiveArray?.forEach(async (item) => {
      var rewardCurrency = tokens.filter(token => token.address == item.rewardCurrency);
      var amount = await Coins(rewardCurrency[0]?.api);
      if (!item.myclaim) {
        pendingreward += item.reward / item.totalVoteWeight * item.myvoteAmount * amount;
      } else {
        totalEarned += item.reward / item.totalVoteWeight * item.myvoteAmount * amount;
      }
      setPrice(pendingreward);
      setEarn(totalEarned);
    })
  }, [activeProposals])
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
