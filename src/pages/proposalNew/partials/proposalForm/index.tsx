import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  FormTextField,
  FormSelect,
  FormSliderInput,
  FormRangeSliderInput,
} from "../../../../components/form";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { colors } from "../../../../common";
import { useEffect, useState } from "react";
import { GET_PROPOSAL } from "../../../../gql";
import { StringOptions } from "sass";

const BoxForm = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

type Props = {
  name: String
}

interface SnapShotData {
  value: number
  display: string
}

// interface snapInterface extends 

const ProposalForm = (props: Props) => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [snapshot, setSnapshot] = useState<SnapShotData[]>([]);
  const [address, setAddress] = useState("");
  const [voteOption, setVoteOption] = useState<SnapShotData[]>([]);
  useEffect(() => {
    if (props.name == "qidao") {
      setName("qidao.eth");
    } else if (props.name == "aave") {
      setName("aave.eth");
    }
  }, [])
  const { data, loading, error, } = useQuery(GET_PROPOSAL, {
    variables: { name: name },
    pollInterval: 0,
  });

  const ClickSnap = (e: any) => {
    const temp = [] as SnapShotData[];
    for (var i = 0; i < data?.proposals[e].choices.length; i++) {
      temp.push({
        value: i,
        display: data?.proposals[e].choices[i]
      })
      setVoteOption(temp);
    }
    const date = new Date(data?.proposals[e].end * 1000);
    timeStyle(date);
  }

  const timeStyle = (date: Date) => {
    const month = myMonth(date);
    const hour = myHour(date);
    const day = date.getDate();
    const year = date.getFullYear();
    const endTime = month + " " + day + ", " + year + ", " + hour;
    setTime(endTime);
  }

  const myMonth = (date: Date) => {
    if (date.getMonth() == 0) { return "January" };
    if (date.getMonth() == 1) { return "February" };
    if (date.getMonth() == 2) { return "March" };
    if (date.getMonth() == 3) { return "April" };
    if (date.getMonth() == 4) { return "May" };
    if (date.getMonth() == 5) { return "June" };
    if (date.getMonth() == 6) { return "July" };
    if (date.getMonth() == 7) { return "August" };
    if (date.getMonth() == 8) { return "September" };
    if (date.getMonth() == 9) { return "October" };
    if (date.getMonth() == 10) { return "November" };
    if (date.getMonth() == 11) { return "December" };
  }

  const myHour = (date: Date) => {
    if (date.getHours() < 12) { return (date.getHours() + " AM") }
    else { return (date.getHours() - 12 + " PM") };
  }

  useEffect(() => {
    const temp = [] as SnapShotData[];
    data?.proposals?.map((i: any, key: number) => {
      temp.push({
        value: key,
        display: i.title
      });
    })
    setSnapshot(temp);
  }, [data])


  const navigate = useNavigate();
  const { prsalType, kpi } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      proposalName: "",
      proposalDescription: "",
      snapshotProposal: "",
      desiredVote: "",
      endTime: "",
      gaugeFixed: "",
      rewardCurrency: "",
      minimumBribe: "0",
      loyaltyVote: "",
      minVoteWeightNum: 0,
      minVoteWeightSlide: 0,
      votePercent: [{ value: 10 }],
      votePercentNum: [{ value: 10 }],
      range: [{ value: [0, 10] }],
      rangeNum: [{ value: [0, 10] }],
      payout: [{ value: 0 }],
    },
  });

  useEffect(() => {
    console.log(address);
  }, [address])

  const {
    fields: votePercentFields,
    append: votePercentAppend,
    remove: votePercentRemove,
  } = useFieldArray({ control, name: "votePercent" });

  const { append: votePercentNumAppend, remove: votePercentNumRemove } =
    useFieldArray({ control, name: "votePercentNum" });

  const { append: rangeAppend, remove: rangeRemove } = useFieldArray({
    control,
    name: "range",
  });

  const { append: rangeNumAppend, remove: rangeNumRemove } = useFieldArray({
    control,
    name: "rangeNum",
  });

  const { append: payoutAppend, remove: payoutRemove } = useFieldArray({
    control,
    name: "payout",
  });

  const onFormSubmit = () => {
    navigate("confirm", {
      state: {
        myProp: "Hey there",
      },
    });
  };

  const isGovernance = prsalType === "governance";
  const isFixed = kpi === "fixed";
  const isVariable = !isGovernance && !isFixed;

  const onAddGaugeVariable = () => {
    votePercentAppend({ value: 0 });
    votePercentNumAppend({ value: 0 });
    rangeAppend({ value: [0, 10] });
    rangeNumAppend({ value: [0, 10] });
    payoutAppend({ value: 0 });
  };

  const onDeleteGaugeVariable = (idx?: number | number[]) => {
    votePercentRemove(idx);
    votePercentNumRemove(idx);
    rangeRemove(idx);
    rangeNumRemove(idx);
    payoutRemove(idx);
  };

  return (
    <Box
      className="flex flex-col gap-8 "
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Box className="grid md:grid-cols-3 gap-8">
        <Box className="flex flex-col md:col-span-2 gap-12">
          <BoxForm className="flex flex-col p-8 md:p-20 rounded-md  gap-8">
            <FormTextField
              label="Proposal Name"
              name="proposalName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "You must enter proposal name.",
                },
              }}
              placeholder="Enter  proposal name here"
            />
            <FormTextField
              label="Proposal Description"
              name="proposalDescription"
              rules={{
                required: {
                  value: true,
                  message: "You must enter proposal description.",
                },
              }}
              control={control}
            />
            <FormSelect
              label="Snapshot Proposal"
              placeholder="Choose a snashot proposal"
              items={snapshot}
              name="snapshotProposal"
              setVote={ClickSnap}
              control={control}
            />
            {isGovernance && (
              <FormSelect
                label="Desired Vote Outcome"
                placeholder="Choose desired vote outcome"
                items={voteOption}
                name="desiredVote"
                control={control}
              />
            )}
            {isGovernance && (
              <FormTextField
                label="Proposal End Time"
                placeholder="This will be 1 hour before Snapshot ends"
                name="endTime"
                control={control}
                time={time}
                readonly={true}
              />
            )}
            {!isGovernance && isFixed && (
              <FormSelect
                label="Select Gauge"
                placeholder="Choose gauge"
                items={voteOption}
                name="gaugeFixed"
                control={control}
              />
            )}
            <FormSelect
              label="Reward Currency"
              placeholder="Choose your reward currency"
              items={[
                { value: 1, display: "WMATIC", address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" },
                { value: 2, display: "USDT", address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F" },
                { value: 3, display: "DAI", address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063" },
                { value: 4, display: "FRAX", address: "0x45c32fA6DF82ead1e2EF74d17b76547EDdFaFF89" },
                { value: 5, display: "MAI", address: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1" },
                { value: 6, display: "WBTC", address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6" },
                { value: 7, display: "WETH", address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619" },
                { value: 8, display: "AAVE", address: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B" },
                { value: 9, display: "QI", address: "0x580A84C73811E1839F75d86d75d88cCa0c241fF4" },
                { value: 10, display: "CRV", address: "0x172370d5cd63279efa6d502dab29171933a610af" },
                { value: 11, display: "GHST", address: "0x385eeac5cb85a38a9a07a70c73e0a3271cfb54a7" },
                { value: 12, display: "SUSHI", address: "0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a" },
                { value: 13, display: "BIFI", address: "0xfbdd194376de19a88118e84e279b977f165d01b8" },
                { value: 14, display: "FXS", address: "0x1a3acf6d19267e2d3e7f898f42803e90c9219062" },
                { value: 15, display: "LINK", address: "0xb0897686c545045aFc77CF20eC7A532E3120E0F1" },
                { value: 16, display: "UNI", address: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f" },
                { value: 17, display: "SAND", address: "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683" },
                { value: 18, display: "MKR", address: "0x6f7C932e7684666C9fd1d44527765433e01fF61d" },
                { value: 19, display: "COMP", address: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c" },
                { value: 20, display: "WOO", address: "0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603" },
                { value: 21, display: "BAL", address: "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3" },
                { value: 22, display: "KNC", address: "0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C" },
                { value: 23, display: "EURS", address: "0xE111178A87A3BFf0c8d18DECBa5798827539Ae99" },
                { value: 24, display: "renBTC", address: "0xDBf31dF14B66535aF65AaC99C32e9eA844e14501" },
                { value: 25, display: "GNS", address: "0xE5417Af564e4bFDA1c483642db72007871397896" },
                { value: 26, display: "SDT", address: "0x361A5a4993493cE00f61C32d4EcCA5512b82CE90" },
                { value: 27, display: "USDS", address: "0x2f1b1662A895C6Ba01a99DcAf56778E7d77e5609" },
              ]}
              setAddress={setAddress}
              name="rewardCurrency"
              control={control}
            />
            {!isGovernance && (
              <FormTextField
                label="Minimum Bribe"
                name="minimumBribe"
                helpText="Enter minimum bribe value if applicable"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "You must enter minimum proposal.",
                  },
                }}
                placeholder="Enter minimum bribe amount if applicable"
              />
            )}
          </BoxForm>
          <BoxForm className="flex flex-col p-8 md:p-20 rounded-md gap-8">
            {votePercentFields.map((vp, idx) => (
              <Box
                key={vp.id}
                className={classNames(
                  "flex flex-col gap-8",
                  isVariable && "bg-[#121415] rounded pt-6 pb-12"
                )}
              >
                {isVariable && (
                  <Box className="flex justify-between px-6">
                    <Typography
                      variant="subtitle1"
                      color={colors.textGray}
                    >{`Section ${idx + 1}`}</Typography>
                    {votePercentFields.length > 1 && (
                      <IconButton
                        aria-label="delte section"
                        className="!bg-red-500 text-white"
                        onClick={() => onDeleteGaugeVariable(idx)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
                <Box
                  className={classNames(
                    "flex flex-col gap-8",
                    isVariable && "px-12"
                  )}
                >
                  {!isGovernance && (
                    <FormSliderInput
                      label="Vote %"
                      helpText="Select the vote% per which payment would be made, eg: 1%"
                      name={`votePercent[${idx}].value`}
                      inputName={`votePercentNum[${idx}].value`}
                      index={idx}
                      control={control}
                      setValue={setValue}
                      valueLabelFormat={(value: number) => `${value}%`}
                      isArray
                    />
                  )}
                  <FormTextField
                    label="Payout"
                    name="payout"
                    control={control}
                    index={idx}
                    placeholder={
                      isGovernance
                        ? "Amount that will be paid out if vote concludes with desired outcome"
                        : "Enter payout in reward currency per vote percent selected above"
                    }
                  />
                  {isGovernance ? (
                    <Box className="flex gap-4">
                      <FormSliderInput
                        label="Minimum Vote Weight"
                        helpText="mention the minimum vote weight that the user has to vote with in order to be eligible for the bribe"
                        name="minVoteWeightSlide"
                        inputName="minVoteWeightNum"
                        index={idx}
                        control={control}
                        setValue={setValue}
                        isArray
                      />
                    </Box>
                  ) : (
                    <FormRangeSliderInput
                      label="Range"
                      name={`range[${idx}].value`}
                      inputName={`rangeNum[${idx}].value`}
                      index={idx}
                      setValue={setValue}
                      control={control}
                      helpText="Select the range that you want to incentivise. The upper range would be considered the target vote. Open ended bribes require an upper range of 100%"
                    />
                  )}
                </Box>
              </Box>
            ))}
            {!isGovernance && !isFixed && (
              <Box className="flex justify-end">
                <Button
                  variant="contained"
                  color="tealLight"
                  type="button"
                  onClick={onAddGaugeVariable}
                >
                  Add
                </Button>
              </Box>
            )}
            {!isGovernance && (
              <FormSelect
                label="Sticky Vote"
                name="loyaltyVote"
                helpText="Select the number of consecutive vote cycles that need to be be voted for to receive the reward"
                control={control}
                placeholder="Number of vote cylces to give payout. Max 4 cylces"
                items={[
                  { value: 1, display: "1" },
                  { value: 2, display: "2" },
                  { value: 3, display: "3" },
                  { value: 4, display: "4" },
                ]}
              />
            )}
          </BoxForm>
          <Box className="mb-10 md:mb-20 flex justify-end"></Box>
        </Box>
        <Box>
          <BoxForm className="flex flex-col p-8 md:p-12 rounded-md gap-8 mb-12 md:mb-0">
            <Typography>Total proposal value</Typography>
            <Box className="flex flex-col gap-8">
              <Box className="grid grid-cols-3 gap-8">
                <Typography className="col-span-2">$/vote</Typography>
                <Typography className="text-right">$0.01</Typography>
                <Typography className="col-span-2">Total Incentive</Typography>
                <Typography className="text-right">
                  $100k
                  <br />
                  100k Mai
                </Typography>
                <Typography className="col-span-2">Max Reward</Typography>
                <Typography className="text-right">100k Mai</Typography>
              </Box>
            </Box>
            <Button variant="contained" color="tealLight" type="submit">
              Continue
            </Button>
          </BoxForm>
        </Box>
      </Box>
    </Box>
  );
};

export { ProposalForm };
