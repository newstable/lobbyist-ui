import {
    Card,
    CardContent,
    Box,
    Button,
    useTheme,
    useMediaQuery,
    InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Proposal } from "../../../@types/proposal";
import {
    EnumProtocolName,
    EnumProtocolSymbolName,
    Protocol,
} from "../../../@types/protocol";
import { FormTextField } from "../../form";
import { TextContent, TextHead } from "../../text";
import { ProposalCardHeader } from "../cardHeader";
import NumberType from "../../../common/number";
import { useEffect, useState } from "react";
import { useSelector } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import tokens from "../../../token.json";
import { Coins } from "../../../blockchain";

type Props = {
    protocol: string;
    proposals: Proposal[];
    isHistory: boolean;
};

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalCardActiveSymbol = ({
    protocol,
    proposals,
    isHistory,
}: Props) => {
    const walletAddress: any = useSelector(
        (state: RootState) => state.wallet.address
    );
    const colHeads = ["Name", "Vote Incentive", "Total Votes", "$/Vote", ""];
    const navigate = useNavigate();
    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));

    const onJoinClick = (proposal: Proposal) => {
        const path = walletAddress === proposal.address ? "vote?proposer=1" : "vote";
        navigate(path, {
            state: {
                proposal,
            },
        });
    };

    const { control } = useForm({
        defaultValues: {
            searchText: "",
        },
    });

    const converter = async (amount: number, rewardCurrency: string) => {
        var api = tokens.filter(token => token.address == rewardCurrency);
        var tokenPrice = await Coins(api[0].api);
        return NumberType(Number((amount * tokenPrice).toFixed(2)));
    }

    return (
        <Card className="" elevation={0}>
            <ProposalCardHeader
                title={`${isHistory ? "Historical" : "Active"} Proposals for ${protocol}`}
            ></ProposalCardHeader>
            <Content className="!p-0">
                <Box className="mb-16">
                    <FormTextField
                        name="minimumProposal"
                        control={control}
                        inputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        inputClass="bg-black"
                        placeholder="Search for proposals..."
                    />
                </Box>
                <Box
                    className={classNames(
                        "grid grid-cols-6 gap-8 px-6 mb-8",
                        !isAboveMd && "hidden"
                    )}
                >
                    {colHeads.map((c, idx) => (
                        <Box className={idx == 0 ? "table-first" : ""} key={`colHead_${idx}`}>
                            <TextHead>{c}</TextHead>
                        </Box>
                    ))}
                </Box>
                <Box className="flex flex-col gap-4">
                    {proposals?.map((p, idx) => (
                        p.type === protocol ?
                            p.isClosed == isHistory ?
                                <Box
                                    key={`prop_${idx}`}
                                    className="p-6 bg-black rounded-md"
                                >
                                    <Box
                                        className={classNames(
                                            "grid gap-8",
                                            isAboveMd
                                                ? "grid-cols-6 items-center"
                                                : "grid-cols-2"
                                        )}
                                    >
                                        <Box
                                            className={classNames(
                                                "flex flex-col table-first",
                                                !isAboveMd && "gap-1"
                                            )}
                                        >
                                            <TextHead
                                                className={classNames(
                                                    isAboveMd && "hidden"
                                                )}
                                            >
                                                {colHeads[0]}
                                            </TextHead>
                                            <TextContent>{p.name.length > 20 ? (p.name.slice(0, 20) + "...") : p.name}</TextContent>
                                        </Box>
                                        <Box
                                            className={classNames(
                                                "flex flex-col",
                                                !isAboveMd && "gap-1"
                                            )}
                                        >
                                            <TextHead
                                                className={classNames(
                                                    isAboveMd && "hidden"
                                                )}
                                            >
                                                {colHeads[1]}
                                            </TextHead>
                                            <TextContent>{`$${converter(p.reward, p.rewardCurrency)}`}</TextContent>
                                        </Box>
                                        <Box
                                            className={classNames(
                                                "flex flex-col",
                                                !isAboveMd && "gap-1"
                                            )}
                                        >
                                            <TextHead
                                                className={classNames(
                                                    isAboveMd && "hidden"
                                                )}
                                            >
                                                {colHeads[2]}
                                            </TextHead>
                                            <TextContent>{NumberType(p.votes)}</TextContent>
                                        </Box>
                                        <Box
                                            className={classNames(
                                                "flex flex-col",
                                                !isAboveMd && "gap-1"
                                            )}
                                        >
                                            <TextHead
                                                className={classNames(
                                                    isAboveMd && "hidden"
                                                )}
                                            >
                                                {colHeads[3]}
                                            </TextHead>
                                            <TextContent>{p.votes == 0 ? "$0" : "$" + converter(p.reward / p.votes, p.rewardCurrency)}</TextContent>
                                        </Box>
                                        {isHistory ? (
                                            <Box
                                                className={classNames(
                                                    isAboveMd && "text-center"
                                                )}
                                            >
                                            </Box>
                                        ) : (
                                            <Box
                                                className={classNames(
                                                    isAboveMd && "text-center"
                                                )}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="tealLight"
                                                    onClick={() => onJoinClick(p)}
                                                >
                                                    View
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                </Box> : <></> : <></>
                    )
                    )}
                </Box>
            </Content>
        </Card>
    );
};

ProposalCardActiveSymbol.defaultProps = {
    isHistory: false,
};

export { ProposalCardActiveSymbol };
