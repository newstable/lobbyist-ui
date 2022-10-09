import {
    Card,
    CardContent,
    Box,
    Button,
    useTheme,
    useMediaQuery,
    InputAdornment,
    TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import { ProposalCardHeader } from "../cardHeader";
import NumberType from "../../../common/number";
import { useEffect, useState } from "react";
import { useSelector } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import styles from "../../form/styles.module.scss";
import { Coins } from "../../../blockchain";

type Props = {
    protocol: string;
    proposals: Proposal[];
    isHistory: boolean;
};

const Content = styled(CardContent)(({ theme }) => ({}));

const Text_Head = styled(TextHead)(({ theme }) => ({
    fontSize: "100%"
}))

const ProposalCardActiveSymbol = ({
    protocol,
    proposals,
    isHistory,
}: Props) => {
    const [realProposals, setRealProposals] = useState<Proposal[]>(proposals);
    const [text, setText] = useState("");
    const walletAddress: any = useSelector(
        (state: RootState) => state.wallet.address
    );
    const chain: any = useSelector((state: RootState) => state.chain.id);
    const colHeads = [
        "Title",
        "Voting For",
        "Rewards",
        "Votes",
        "$/Vote",
        "",
    ];
    const navigate = useNavigate();
    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));

    const onJoinClick = (proposal: Proposal) => {
        const path =
            walletAddress === proposal.address ? "vote?proposer=1" : "vote";
        navigate(path, {
            state: {
                proposal,
            },
        });
    };

    useEffect(() => {
        var search: Proposal[] = proposals?.filter(
            (proposal) => proposal.name.search(new RegExp(text, "i")) > -1
        );
        setRealProposals(search);
    }, [text, proposals]);

    return (
        <Card className="" elevation={0}>
            <ProposalCardHeader
                title={`${isHistory ? "Historical" : "Active"
                    } Proposals for ${protocol}`}
            ></ProposalCardHeader>
            <Content className="!p-0">
                <Box className="mb-16 rounded-50">
                    <TextField
                        className={classNames(styles.input, "bg-black rounded-50")}
                        placeholder="Search for proposals..."
                        fullWidth
                        onChange={(e) => setText(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Box
                    className={classNames(
                        "grid grid-cols-custom-6 gap-8 px-6 mb-8",
                        !isAboveMd && "hidden"
                    )}
                >
                    {colHeads.map((c, idx) => (
                        <Box key={`colHead_${idx}`}>
                            <Text_Head>{c}</Text_Head>
                        </Box>
                    ))}
                </Box>
                <Box className="flex flex-col gap-4">
                    {realProposals?.map((p, idx) =>
                        p.type === protocol ?
                            p.chain == chain ?
                                (
                                    p.isClosed == isHistory ? (
                                        <Box key={`prop_${idx}`} className="p-6 bg-black rounded-md">
                                            <Box
                                                className={classNames(
                                                    "grid gap-8",
                                                    isAboveMd ? "grid-cols-custom-6 items-center" : "grid-cols-2",
                                                    idx == 0 ? "" : ""
                                                )}
                                            >
                                                <Box
                                                    className={classNames(
                                                        "flex flex-col",
                                                        !isAboveMd && "gap-1"
                                                    )}
                                                >
                                                    <TextHead className={classNames(isAboveMd && "hidden")}>
                                                        {colHeads[0]}
                                                    </TextHead>
                                                    <TextContent>
                                                        {p.name.length > 30
                                                            ? p.name.slice(0, 30) + "..."
                                                            : p.name}
                                                    </TextContent>
                                                </Box>
                                                <Box
                                                    className={classNames(
                                                        "flex flex-col",
                                                        !isAboveMd && "gap-1"
                                                    )}
                                                >
                                                    <TextHead className={classNames(isAboveMd && "hidden")}>
                                                        {colHeads[1]}
                                                    </TextHead>
                                                    <TextContent>{p.protocol.length > 30
                                                        ? p.protocol.slice(0, 30) + "..."
                                                        : p.protocol}</TextContent>
                                                </Box>
                                                <Box
                                                    className={classNames(
                                                        "flex flex-col",
                                                        !isAboveMd && "gap-1"
                                                    )}
                                                >
                                                    <TextHead className={classNames(isAboveMd && "hidden")}>
                                                        {colHeads[2]}
                                                    </TextHead>
                                                    <TextContent>{`$${NumberType(
                                                        p.usdAmount.toFixed(2),
                                                        2
                                                    )}`}</TextContent>
                                                </Box>
                                                <Box
                                                    className={classNames(
                                                        "flex flex-col",
                                                        !isAboveMd && "gap-1"
                                                    )}
                                                >
                                                    <TextHead className={classNames(isAboveMd && "hidden")}>
                                                        {colHeads[3]}
                                                    </TextHead>
                                                    <TextContent>
                                                        {NumberType(p.totalVoteWeight.toFixed(2), 2)}
                                                    </TextContent>
                                                </Box>
                                                <Box
                                                    className={classNames(
                                                        "flex flex-col",
                                                        !isAboveMd && "gap-1"
                                                    )}
                                                >
                                                    <TextHead className={classNames(isAboveMd && "hidden")}>
                                                        {colHeads[4]}
                                                    </TextHead>
                                                    <TextContent>
                                                        {p.totalVoteWeight == 0 ? ("$0") : p.totalVoteWeight < 1 ? "$" + NumberType(p.usdAmount.toFixed(2), 2) : (
                                                            "$" + NumberType((p.usdAmount / p.totalVoteWeight).toFixed(6), 6))}
                                                    </TextContent>
                                                </Box>
                                                {isHistory ? (
                                                    <Box
                                                        className={classNames(isAboveMd && "text-center")}
                                                    ></Box>
                                                ) : (
                                                    <Box className={classNames(isAboveMd && "text-center")}>
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
                                        </Box>
                                    ) : (
                                        <></>
                                    )
                                ) : (
                                    <></>
                                ) : (<></>)
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
