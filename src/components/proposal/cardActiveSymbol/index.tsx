import classNames from "classnames";
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, Box, Button, useTheme, useMediaQuery, InputAdornment, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from "../../form/styles.module.scss";
import { TextContent, TextHead } from "../../text";
import { ProposalCardHeader } from "../cardHeader";

import { AppContext } from "../../../App"
import { useSelector } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import { Proposal } from "../../../@types/proposal";
import NumberType from "../../../common/number";

type Props = {
    protocol: string;
    proposals: Proposal[];
    isHistory: boolean;
};

const ChainImg: any = {
    1: "../../assets/chains/eth.svg",
    10: "../../assets/chains/optimism.png",
    56: "../../assets/chains/bsc.png",
    137: "../../assets/chains/polygon.svg",
    250: "../../assets/chains/fantom.png",
    42161: "../../assets/chains/arbitrum.svg",
    43114: "../../assets/chains/avax.png"
}

const Content = styled(CardContent)(({ theme }) => ({}));
const Text_Head = styled(TextHead)(({ theme }) => ({ fontSize: "100%" }))

const firstItems = 9;
const ProposalCardActiveSymbol = ({ protocol, proposals, isHistory, }: Props) => {
    const [text, setText] = useState("");
    const walletAddress: any = useSelector((state: RootState) => state.wallet.address);
    const chain: any = useSelector((state: RootState) => state.chain.id);
    const colHeads = ["Chain", "Title", "Voting For", "Rewards", "Votes", "$/Vote", ""];
    const navigate = useNavigate();
    const theme = useTheme();
    const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));

    const onJoinClick = (proposal: Proposal) => {
        const path = walletAddress === proposal.address ? "vote?proposer=1" : "vote";
        navigate(path, { state: { proposal } });
    };

    const [allRealProposals, setAllRealProposals] = useState<Proposal[]>([]);
    const [realProposals, setRealProposals] = useState<Proposal[]>(proposals);
    useEffect(() => {
        let tempProposals: Proposal[] = [];
        if (!proposals || !proposals.length) { setRealProposals(tempProposals); return; };

        tempProposals = proposals?.filter((proposal) => {
            return proposal.name.search(new RegExp(text, "i")) > -1 && proposal.type === protocol && proposal.chain == chain && proposal.isClosed == isHistory;
        });
        setAllRealProposals(tempProposals);
    }, [text, proposals, isHistory]);

    const [loadMoreStatus, setLoadMoreStatus] = useState(false);
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const loadMoreClick = () => { setLoadMoreStatus(true); setLoadMoreCount(1) };

    useEffect(() => {
        let proposals: Proposal[] = [];
        if (!allRealProposals.length) { setRealProposals(proposals); return; }

        proposals = allRealProposals.slice(0, firstItems * (loadMoreCount + 1));
        setRealProposals(proposals);
    }, [allRealProposals, loadMoreCount, loadMoreCount]);

    const [appData] = useContext<any>(AppContext);
    const [beforeScroll, setBeforeScroll] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!appData.scrollState || !loadMoreCount) return;
        const EL = appData.containRef;

        const Height = EL.offsetHeight;
        const scrollTop = EL.scrollTop;
        const totalHeight = EL.scrollHeight;

        if (totalHeight * 0.9 < (scrollTop + Height)) {
            if (scrollTop < beforeScroll + 200) return;
            setBeforeScroll(scrollTop);

            if (allRealProposals.length > firstItems * (loadMoreCount + 1))
                setLoading(true);

            setTimeout(() => {
                setLoadMoreCount(loadMoreCount + 1);
                setLoading(false);
            }, 2000);
        }
    }, [appData.scrollState]);

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
                        "grid grid-cols-custom-7 gap-8 px-6 mb-8",
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
                        <Box key={`prop_${idx}`} className="p-6 bg-black rounded-md">
                            <Box
                                className={classNames(
                                    "grid gap-8",
                                    isAboveMd ? "grid-cols-custom-7 items-center" : "grid-cols-2",
                                    idx == 0 ? "" : ""
                                )}
                            >
                                <Box
                                    className={classNames("flex flex-col card-item", !isAboveMd && "gap-1")}
                                >
                                    <Text_Head className={classNames(isAboveMd && "hidden")}>
                                        {colHeads[0]}
                                    </Text_Head>
                                    <img width="23" src={ChainImg[p.chain]}></img>
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
                                    <TextContent>
                                        {p.name.length > 23
                                            ? p.name.slice(0, 23) + "..."
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
                                        {colHeads[2]}
                                    </TextHead>
                                    <TextContent>{p.choice.length > 23
                                        ? p.choice.slice(0, 23) + "..."
                                        : p.choice}
                                    </TextContent>
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
                                        {colHeads[4]}
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
                                        {colHeads[5]}
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
                    )}
                </Box>

                {allRealProposals.length > firstItems && <Box component='span' className="flex items-center justify-center load-more-btn">
                    {!loadMoreStatus && <Typography component="h6"
                        className="flex items-center justify-center text-center"
                        onClick={loadMoreClick}
                    >
                        load more <ExpandMoreIcon />
                    </Typography>}
                </Box>}

                {loading && <Box component={'div'} className='flex items-center justify-center'>
                    <ReactLoading type='cylon' color={'white'} height={'50px'} width={'80px'} />
                </Box>}
            </Content>
        </Card>
    );
};

ProposalCardActiveSymbol.defaultProps = { isHistory: false };
export { ProposalCardActiveSymbol };
