import ReactLoading from 'react-loading';
import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import "./index.scss";
import ProposalItem from "./item";

import { AppContext } from "../../../App";
import { useSelector } from "../../../redux/store";
import { Proposal } from "../../../@types/proposal";

const firstItems = 9;

const Proposals = () => {
    const [sort, setSort] = useState("");
    const [protocol, setProtocol] = useState("");
    const [reward, setReward] = useState("");
    const [allSortProposal, setAllSortProposal] = useState<Proposal[]>([]);
    const [sortProposal, setSortProposal] = useState<Proposal[]>([]);
    const proposalState = useSelector((state) => state.proposal);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    useEffect(() => {
        setProposal();
    }, [sort, proposalState, protocol, reward]);
    const setProposal = () => {
        let search: Proposal[] = proposals?.filter(
            (proposal: any) => proposal.chain == sort || sort == ""
        );
        let sortedProposal: Proposal[] = search?.filter(
            (proposal: any) => proposal.type == protocol || protocol == ""
        )
        let sortedByReward: Proposal[] = sortedProposal?.sort((a, b) => {
            if (reward == "max")
                return a.reward < b.reward ? 1 : -1
            else {
                return a.reward > b.reward ? 1 : -1
            }
        });

        if (!sortedByReward) return;
        sortedByReward = sortedByReward?.reduce((items: Proposal[], item: Proposal) => {
            return !item.isClosed ? [...items, item] : [...items];
        }, []);
        setAllSortProposal(sortedByReward);
    }

    const [loadMoreStatus, setLoadMoreStatus] = useState(false);
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const loadMoreClick = () => { setLoadMoreStatus(true); setLoadMoreCount(1) };

    useEffect(() => {
        let proposals: Proposal[] = [];
        if (!allSortProposal.length) { setSortProposal(proposals); return; }

        proposals = allSortProposal.slice(0, firstItems * (loadMoreCount + 1));
        setSortProposal(proposals);
    }, [allSortProposal, loadMoreCount, loadMoreCount]);

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

            if (allSortProposal.length > firstItems * (loadMoreCount + 1))
                setLoading(true);

            setTimeout(() => {
                setLoadMoreCount(loadMoreCount + 1);
                setLoading(false);
            }, 2000);
        }
    }, [appData.scrollState]);

    return (
        <div className="wall">
            <div className="flex items-center will-justify">
                {/* <div className="sm:flex items-center">
                    <div className=" text-2xl">SORT BY CHAIN : </div>
                    <div>
                        <select className="wall-select" onChange={(e) => setSort(e.target.value)}>
                            <option value={""}>All</option>
                            <option value={1}>Ethereum</option>
                            <option value={56}>Binance</option>
                            <option value={137}>Polygon</option>
                            <option value={250}>Fantom</option>
                            <option value={10}>Optimism</option>
                            <option valssue={42161}>Arbitrum</option>
                            <option value={43114}>Avalanche</option>
                        </select>
                    </div>
                </div> */}
                <div className="sm:flex items-center ml-6">
                    <div className="text-2xl">SORT BY Protocol : </div>
                    <select className="wall-select" onChange={(e) => setProtocol(e.target.value)}>
                        <option value={""}>All</option>
                        <option value={"qidao"}>QIDAO</option>
                        <option value={"aave"}>AAVE</option>
                        <option value={"saddlefinance"}>Saddle</option>
                        <option value={"aurafinance"}>Aura</option>
                        <option value={"beets"}>Beethovenx</option>
                        <option value={"ribbon"}>Ribbon</option>
                        <option value={"onx"}>Onx</option>
                        <option value={"vesqdao"}>Vesq</option>
                    </select>
                </div>
                <div className="sm:flex items-center ml-6">
                    <div className="text-2xl">SORT BY REWARD : </div>
                    <select className="wall-select" onChange={(e) => setReward(e.target.value)}>
                        <option value={"max"}>High</option>
                        <option value={"min"}>Low</option>
                    </select>
                </div>
            </div>

            <div className="justify-center mt-12 wall-grid-col grid gap-8">
                {sortProposal?.map((proposal, key) => <ProposalItem proposal={proposal} key={key} />)}
            </div>


            {
                allSortProposal.length > firstItems &&
                <Box component='span' className="flex items-center justify-center load-more-btn">
                    {
                        !loadMoreStatus && <Typography component="h6"
                            className="flex items-center justify-center text-center"
                            onClick={loadMoreClick}
                        >
                            load more <ExpandMoreIcon />
                        </Typography>
                    }
                </Box>
            }

            {loading && <Box component={'span'} className='flex items-center justify-center'>
                <ReactLoading type='cylon' color={'white'} height={'30px'} width={'80px'} />
            </Box>}
        </div>
    )
}

export default Proposals;