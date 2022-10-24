import "./index.scss";
import { useSelector } from "../../../redux/store";
import { useEffect, useState } from "react";
import NumberType from "../../../common/number";
import { Coins } from "../../../blockchain";

const Analytics = () => {
    const [sort, setSort] = useState("");
    const [lockedValue, setLockedValue] = useState(0);
    const [totalProposals, setTotalProposals] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const proposalState = useSelector((state) => state.proposal);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    useEffect(() => {
        selectedProposals();
    }, [sort, proposals])
    const selectProtocol = (e: string) => {
        setSort(e);
    }

    const selectedProposals = () => {
        var search: any = proposals?.filter(
            (proposal: any) => proposal.type == sort || sort == ""
        );
        setTotalProposals(search ? search.length : 0);
        var lockedReward = 0;
        var paidReward = 0;
        search?.filter((proposal: any) => {
            if (proposal.isClosed) {
                paidReward += proposal.usdAmount;
            }
            else {
                lockedReward += proposal.usdAmount;
            }
        })
        setLockedValue(lockedReward);
        setTotalPaid(paidReward);
    }
    return (
        <div className="analytics">
            <div className="flex items-center analytics-justify">
                <div className="sm:flex items-center">
                    <div className=" text-2xl">SORT BY PROTOCOLS : </div>
                    <div>
                        <select className="wall-select" onChange={(e) => selectProtocol(e.target.value)}>
                            <option value={""}>All</option>
                            <option value={"qidao"}>QIDAO</option>
                            <option value={"aave"}>AAVE</option>
                            <option value={"saddlefinance"}>Saddle</option>
                            <option value={"aurafinance"}>Aura</option>
                            <option value={"beets"}>Beethovenx</option>
                            <option value={"ribbon"}>Ribbon</option>
                            <option value={"onx"}>Onx</option>
                            <option value={"vesq"}>Vesq</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="justify-center mt-12 analytics-grid-col grid gap-8">
                <div className="item text-center">
                    <h1 className="analy-font-1">${NumberType(lockedValue.toFixed(2), 2)}</h1>
                    <p >TVL</p>
                </div>
                <div className="item text-center">
                    <h1 className="analy-font-1">{totalProposals}</h1>
                    <p >Total Proposals</p>
                </div>
                <div className="item text-center">
                    <h1 className="analy-font-1">${NumberType(totalPaid.toFixed(2), 2)}</h1>
                    <p >Total Paid</p>
                </div>
            </div>
        </div>
    )
}

export default Analytics;