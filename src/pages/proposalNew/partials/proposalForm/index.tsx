import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { NotificationManager } from 'react-notifications';
import { ethers } from "ethers";
import {
    FormTextField,
    FormSelect,
    FormSliderInput,
    FormRangeSliderInput,
} from "../../../../components/form";
import { colors } from "../../../../common";
import { useEffect, useState } from "react";
import { GET_PROPOSALS } from "../../../../gql";
import tokens from "../../../../token.json";
import { useSelector } from "../../../../redux/store";
import { RootState } from "../../../../redux/store";
import { dispatch } from "../../../../redux/store";
import { setClickAddress } from "../../../../redux/slices/clickToken";
import loader from "../../../../assets/loader.gif";
import { createProposal } from "../../../../blockchain";
import { Coins } from "../../../../blockchain";

const BoxForm = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
}));

type Props = {
    name: String;
};

interface SnapShotData {
    value: number;
    display: string;
}

// interface snapInterface extends

const ProposalForm = (props: Props) => {
    const [myloading, setMyLoading] = useState(false);
    const [submitType, setSubmitType] = useState(false);
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [address, setAddress] = useState("");
    const [snapshot, setSnapshot] = useState<SnapShotData[]>([]);
    const [voteOption, setVoteOption] = useState<SnapShotData[]>([]);
    const [proposalName, setProposalName] = useState("");
    const [proposalDescription, setProposalDescription] = useState("");
    const [rewardType, setRewardType] = useState("WMATIC");
    const [maxReward, setMaxReward] = useState(0);
    const [usd, setUsd] = useState(0);
    const walletAddress: any = useSelector(
        (state: RootState) => state.wallet.address
    );

    useEffect(() => {
        if (props.name == "qidao") {
            setName("qidao.eth");
            setValue("platformType", "qidao");
        } else if (props.name == "aave") {
            setName("aave.eth");
            setValue("platformType", "aave");
        } else if (props.name == "vesq") {
            setName("vesqdao.eth");
            setValue("platformType", "vesq");
        }
    }, []);

    useEffect(() => {
        const tokenPrice = async () => {
            var currencyType = tokens.filter(token => token.display == rewardType)
            var price = await Coins(currencyType[0].api);
            setUsd(price);
        }
        tokenPrice();
    }, [maxReward])

    useEffect(() => {
        if (walletAddress !== "") {
            setValue("userAddress", walletAddress);
        }
    }, [walletAddress]);

    const { data, loading, error } = useQuery(GET_PROPOSALS, {
        variables: { name: name },
        pollInterval: 0,
    });

    const ClickSnap = (e: any) => {
        const temp = [] as SnapShotData[];
        for (var i = 0; i < data?.proposals[e].choices.length; i++) {
            temp.push({
                value: i,
                display: data?.proposals[e].choices[i],
            });
            setVoteOption(temp);
        }
        const date = new Date(data?.proposals[e].end * 1000);
        setValue("endTime", (data?.proposals[e].end * 1000).toString());
        setValue("proposalId", (data?.proposals[e].id));
        setValue("proposalName", (data?.proposals[e].title));
        setValue("proposalDescription", (data?.proposals[e].body));
        setProposalName(data?.proposals[e].title);
        setProposalDescription(data?.proposals[e].body);
        timeStyle(date);
    };

    var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const timeStyle = (date: Date) => {
        const month = date.getMonth();
        const hour = myHour(date);
        const day = date.getDate();
        const year = date.getFullYear();
        const result = monthName[month] + " " + day + ", " + year + ", " + hour;
        setTime(result);
    };

    const myHour = (date: Date) => {
        if (date.getHours() < 12) {
            return date.getHours() + " AM";
        } else {
            return date.getHours() - 12 + " PM";
        }
    };

    useEffect(() => {
        const temp = [] as SnapShotData[];
        data?.proposals?.map((i: any, key: number) => {
            temp.push({
                value: key,
                display: i.title,
            });
        });
        setSnapshot(temp);
    }, [data]);

    const navigate = useNavigate();
    const { prsalType, kpi } = useParams();

    const clickToken = (e: any) => {
        setAddress(e);
        dispatch(setClickAddress(e));
    }

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            platformType: "",
            proposalName: "",
            proposalDescription: "",
            snapshotProposal: "",
            desiredVote: "",
            endTime: "",
            gaugeFixed: "",
            rewardCurrency: "WMATIC",
            minimumBribe: "0",
            loyaltyVote: "",
            votePercent: [{ value: 10 }],
            votePercentNum: [{ value: 10 }],
            range: [{ value: [0, 10] }],
            rangeNum: [{ value: [0, 10] }],
            payout: "0",
            userAddress: "",
            proposalId: "",
        },
    });

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
    const OnFormSubmit = async (value: any) => {
        if (walletAddress === "") {
            NotificationManager.warning("Please connect wallet...!", "Warning");
        } else if (value.snapshotProposal == "") {
            NotificationManager.warning("Please select a proposal on snapshot!", "Warning");
        } else if (value.desiredVote == "") {
            NotificationManager.warning("Please select a choice!", "Warning");
        } else {
            setMyLoading(true);
            const result: any = await createProposal({
                address: address,
                walletAddress: walletAddress,
                value: value,
                submitType: submitType,
            });
            if (!result.status) {
                NotificationManager.warning(result.message, "Warning");
            } else {
                NotificationManager.success(result.message, "Success");
                if (submitType)
                    navigate(`/proposal/${props.name}`);
                setSubmitType(!submitType);
            }
            setMyLoading(false);
        }
    };

    const isGovernance = prsalType === "governance";
    const isFixed = prsalType === "fixed";
    const isVariable = !isGovernance && !isFixed;

    const onAddGaugeVariable = () => {
        votePercentAppend({ value: 0 });
        votePercentNumAppend({ value: 0 });
        rangeAppend({ value: [0, 10] });
        rangeNumAppend({ value: [0, 10] });
        // payoutAppend(0);
    };

    const onDeleteGaugeVariable = (idx?: number | number[]) => {
        votePercentRemove(idx);
        votePercentNumRemove(idx);
        rangeRemove(idx);
        rangeNumRemove(idx);
        // payoutRemove(idx);
    };

    return (
        <Box
            className="flex flex-col gap-8 "
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(OnFormSubmit)}
        >
            <Box className="grid md:grid-cols-3 gap-8">
                <Box className="flex flex-col md:col-span-2 gap-12">
                    <BoxForm className="flex flex-col p-8 md:p-20 rounded-md  gap-8">
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
                        <FormTextField
                            label="Proposal Name"
                            name="proposalName"
                            control={control}
                            placeholder=""
                        />
                        <FormTextField
                            label="Proposal Description"
                            name="proposalDescription"
                            control={control}
                        />
                        <FormTextField
                            label="Proposal End Time"
                            name="endTime"
                            control={control}
                            time={time}
                            readonly={true}
                        />
                        {!isGovernance && isFixed && (
                            <FormSelect
                                label="Outcome Choice"
                                placeholder="Choose a Choice"
                                items={voteOption}
                                name="desiredVote"
                                control={control}
                            />
                        )}

                        {/* {!isGovernance && (
                            <FormTextField
                                label="Minimum Bribe"
                                name="minimumBribe"
                                textType="number"
                                helpText="Enter minimum bribe value if applicable"
                                control={control}
                                rules={{
                                    required: {
                                        value: true,
                                        message:
                                            "You must enter minimum proposal.",
                                    },
                                }}
                                placeholder="Enter minimum bribe amount if applicable"
                            />
                        )} */}
                    </BoxForm>
                    <BoxForm className="flex flex-col p-8 md:p-20 rounded-md gap-8">
                        {votePercentFields.map((vp, idx) => (
                            <Box
                                key={vp.id}
                                className={classNames(
                                    "flex flex-col gap-8",
                                    isVariable &&
                                    "bg-[#1f2028] rounded pt-6 pb-12"
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
                                                onClick={() =>
                                                    onDeleteGaugeVariable(idx)
                                                }
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
                                    {/* {!isGovernance && (
                                        <FormSliderInput
                                            label="Vote %"
                                            helpText="Select the vote% per which payment would be made, eg: 1%"
                                            name={`votePercent[${idx}].value`}
                                            inputName={`votePercentNum[${idx}].value`}
                                            index={idx}
                                            control={control}
                                            setValue={setValue}
                                            valueLabelFormat={(value: number) =>
                                                `${value}%`
                                            }
                                            isArray
                                        />
                                    )} */}
                                    <FormSelect
                                        label="Reward Currency"
                                        placeholder="Choose your reward currency"
                                        items={tokens}
                                        setReward={setRewardType}
                                        setClickToken={clickToken}
                                        name="rewardCurrency"
                                        control={control}
                                    />
                                    <FormTextField
                                        label="Max Reward"
                                        name="payout"
                                        control={control}
                                        textType="number"
                                        setrewardAmount={setMaxReward}
                                        index={idx}
                                        placeholder={
                                            isGovernance
                                                ? "The maximum amount that will be paid out when the vote concludes"
                                                : "Enter payout in reward currency per vote percent"
                                        }
                                    />
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
                    </BoxForm>
                    <Box className="mb-10 md:mb-20 flex justify-end"></Box>
                </Box>
                <Box>
                    <BoxForm className="flex flex-col p-8 md:p-12 rounded-md gap-8 mb-12 md:mb-0">
                        <strong>Total proposal value</strong>
                        <Box className="flex flex-col gap-8">
                            <Box className="grid grid-cols-3 gap-8">
                                <Typography className="feetitle col-span-2">
                                    Max Reward
                                </Typography>
                                <Typography className="text-right">
                                    {maxReward + " " + rewardType}
                                    <br />
                                    ${(maxReward * usd).toFixed(2)}
                                </Typography>
                                <Typography className="col-span-2">
                                    Lobbyist Fee
                                </Typography>
                                <Typography className="text-right">
                                    2.5%
                                    <br />
                                    ${(maxReward * 0.025 * usd).toFixed(2)}
                                </Typography>
                                
                            </Box>
                            <Typography className="feename">
                                    The fee will be deducted from the Max Reward on deposit
                                </Typography>
                        </Box>
                        {myloading ? (
                            <Button
                                variant="contained"
                                color="tealLight"
                            >
                                <img style={{ width: "25px" }} src={loader}></img>
                            </Button>
                        ) :
                            submitType ?
                                <Button
                                    variant="contained"
                                    color="tealLight"
                                    type="submit"
                                >
                                    Submit
                                </Button> :
                                <Button
                                    variant="contained"
                                    color="tealLight"
                                    type="submit"
                                >
                                    Approve
                                </Button>
                        }
                    </BoxForm>
                </Box>
            </Box>
        </Box>
    );
};

export { ProposalForm };
