import ProposalItem from "./item";
import { useSelector } from "../../../redux/store";
import "./index.scss";
import { useEffect, useState } from "react";
import { Proposal } from "../../../@types/proposal";
const Proposals = () => {
    const [sort, setSort] = useState("");
    const [protocol, setProtocol] = useState("");
    const [sortProposal, setSortProposal] = useState<Proposal[]>([]);
    const proposalState = useSelector((state) => state.proposal);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    useEffect(() => {
        setProposal();
    }, [sort, proposalState, protocol]);
    const setProposal = () => {
        var search: Proposal[] = proposals?.filter(
            (proposal: any) => proposal.chain == sort || sort == ""
        );
        var sortedProposal: Proposal[] = search?.filter(
            (proposal: any) => proposal.type == protocol || protocol == ""
        )
        setSortProposal(sortedProposal);
    }
    const selectChain = (e: any) => {
        setSort(e);
    }
    const selectProtocol = (e: any) => {
        setProtocol(e);
    }
    return (
        <div className="wall">
            <div className="flex items-center will-justify">
                <div className="sm:flex items-center">
                    <div className=" text-2xl">SORT BY CHAIN : </div>
                    <div>
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
                </div>
                <div className="sm:flex items-center ml-6">
                    <div className="text-2xl">SORT BY Protocol : </div>
                    <select className="wall-select" onChange={(e) => selectProtocol(e.target.value)}>
                        <option value={""}>All</option>
                        <option value={"qidao"}>QIDAO</option>
                        <option value={"aave"}>AAVE</option>
                        <option value={"saddle"}>Saddle</option>
                        <option value={"aura"}>Aura</option>
                        <option value={"beethovenx"}>Beethovenx</option>
                        <option value={"ribbon"}>Ribbon</option>
                        <option value={"onx"}>Onx</option>
                    </select>
                </div>
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