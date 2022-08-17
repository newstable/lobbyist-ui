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

type Props = {
    protocol: Protocol;
    proposals: Proposal[];
    isHistory?: boolean;
};

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalCardActiveSymbol = ({
    protocol,
    proposals,
    isHistory,
}: Props) => {
    const colHeads = ["Name", "Vote Incentive", "Total Votes", "$/Vote", ""];
    const navigate = useNavigate();
    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));

    const onJoinClick = (proposal: Proposal, idx: number) => {
        const path = idx % 2 === 0 ? "vote" : "vote?proposer=1";
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

    return (
        <Card className="">
            <ProposalCardHeader
                title={`${isHistory ? "History" : "Active"} Proposals for ${
                    EnumProtocolName[protocol.symbol]
                }`}
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
                    {proposals.map((p, idx) => (
                        <Box
                            key={`prop_${idx}`}
                            className="p-6 bg-black rounded-md"
                        >
                            <Box
                                className={classNames(
                                    "grid gap-8",
                                    isAboveMd
                                        ? "grid-cols-5 items-center"
                                        : "grid-cols-2"
                                )}
                            >
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
                                        {colHeads[0]}
                                    </TextHead>
                                    <TextContent>{p.protocol.name}</TextContent>
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
                                    <TextContent>{`${p.reward} ${
                                        EnumProtocolSymbolName[
                                            p.protocol.symbol
                                        ]
                                    }`}</TextContent>
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
                                    <TextContent>12, 500</TextContent>
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
                                    <TextContent>$0.07</TextContent>
                                </Box>
                                {isHistory ? (
                                    <Box
                                        className={classNames(
                                            isAboveMd && "text-center"
                                        )}
                                    >
                                        <Button
                                            variant="contained"
                                            color="tealLight"
                                        >
                                            View
                                        </Button>
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
                                            onClick={() => onJoinClick(p, idx)}
                                        >
                                            View
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Content>
        </Card>
    );
};

ProposalCardActiveSymbol.defaultProps = {
    isHistory: false,
};

export { ProposalCardActiveSymbol };
