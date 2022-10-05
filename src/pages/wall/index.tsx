import Item from "./item";
import { Select, MenuItem } from "@mui/material";
import { useSelector } from "../../redux/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { Proposal } from "../../@types/proposal";

const Wall = () => {
    const [sort, setSort] = useState();
    const [sortProposal, setSortProposal] = useState<Proposal[]>([]);
    const proposalState = useSelector((state) => state.proposal);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    useEffect(() => {
        setProposal();
    }, [sort, proposalState])

    const setProposal = () => {
        var search: Proposal[] = proposals?.filter(
            (proposal: any) => proposal.chain == sort || sort == ""
        );
        setSortProposal(search);
    }
    const selectChain = (e: any) => {
        setSort(e);
    }
    return (
        <div className="wall">
            <div className="flex items-center">
                <div className=" text-2xl">SORT BY CHAIN : </div>
                <select className="wall-select" onChange={(e) => selectChain(e.target.value)}>
                    <option value={""}>All</option>
                    <option value={1}>Ethereum</option>
                    <option value={56}>Binance</option>
                    <option value={137}>Polygon</option>
                    <option value={250}>Fantom</option>
                    <option value={10}>Optimism</option>
                    <option value={42161}>Arbitrum</option>
                    <option value={43114}>Arvalanche</option>
                </select>
            </div>
            <div className="justify-center mt-12 grid-cols-3 grid gap-20">
                {sortProposal?.map((proposal, key) => {
                    return (
                        <Item proposal={proposal} key={key} />
                    )
                })}
            </div>
        </div>
    )
}

export default Wall;