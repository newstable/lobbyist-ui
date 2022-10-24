import ProposalItem from "./item";
import { useSelector } from "../../../redux/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { Proposal } from "../../../@types/proposal";
const Proposals = () => {
    const [sort, setSort] = useState("");
    const [protocol, setProtocol] = useState("");
    const [reward, setReward] = useState("");
    const [sortProposal, setSortProposal] = useState<Proposal[]>([]);
    const proposalState = useSelector((state) => state.proposal);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    useEffect(() => {
        setProposal();
    }, [sort, proposalState, protocol, reward]);
    const setProposal = () => {
        var search: Proposal[] = proposals?.filter(
            (proposal: any) => proposal.chain == sort || sort == ""
        );
        var sortedProposal: Proposal[] = search?.filter(
            (proposal: any) => proposal.type == protocol || protocol == ""
        )
        var sortedByReward: Proposal[] = sortedProposal?.sort((a, b) => {
            if (reward == "max")
                return a.reward < b.reward ? 1 : -1
            else {
                return a.reward > b.reward ? 1 : -1
            }
        });
        setSortProposal(sortedByReward);
    }
    return (
        <div className="wall">
            <div className="flex items-center will-justify">
                <div className="sm:flex items-center">
                    <div className=" text-2xl">SORT BY CHAIN : </div>
                    <div>
                        <select className="wall-select" onChange={(e) => setSort(e.target.value)}>
                            <option value={""}>All</option>
                            <option value={1}>Ethereum</option>
                            <option value={56}>Binance</option>
                            <option value={137}>Polygon</option>
                            <option value={250}>Fantom</option>
                            <option value={10}>Optimism</option>
                            <option value={42161}>Arbitrum</option>
                            <option value={43114}>Avalanche</option>
                        </select>
                    </div>
                </div>
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
                {/* <div className="sm:flex items-center ml-6">
                    <div className="text-2xl">SORT BY REWARD : </div>
                    <select className="wall-select" onChange={(e) => setReward(e.target.value)}>
                        <option value={"max"}>High</option>
                        <option value={"min"}>Low</option>
                    </select>
                </div> */}
            </div>
            <div className="justify-center mt-12 wall-grid-col grid gap-8">
                {sortProposal?.map((proposal, key) => {
                    return (
                        !proposal.isClosed ? (
                            <ProposalItem proposal={proposal} key={key} />
                        ) : <></>
                    )
                })}
            </div>
        </div>
    )
}

export default Proposals;