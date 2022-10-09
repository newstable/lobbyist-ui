import "./index.scss";
import NumberType from "../../common/number";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, RootState } from "../../redux/store";
import { Protocols } from "../../@types";
import { useEffect, useState } from "react";
import { AnyMap } from "immer/dist/internal";
import switchChain from "../../components/header/switchchain";
import { NotificationManager } from "react-notifications";
type Props = {
    protocol: Protocols;
}
const Item = (props: Props) => {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [earn, setEarn] = useState(0);
    const walletAddress: any = useSelector(
        (state: RootState) => state.wallet.address
    );
    const library: any = useSelector(
        (state: RootState) => state.provider.provider
    );
    const proposalState = useSelector((state) => state.proposal);
    const chainId = useSelector((state) => state.chain.id);
    // @ts-ignore
    const proposals = proposalState.currentProposal.data;
    const { protocol } = props;

    useEffect(() => {
        const getActiveArray = proposals?.filter(
            (element: any) => element.type == protocol.protocol && !element.isClosed
        );
        const myProposals = proposals?.filter(
            (element: any) => element.type == protocol.protocol
        );
        var totalEarned = 0;
        setCount(getActiveArray?.length);
        myProposals?.forEach(async (item: any) => {
            if (item.myclaim) {
                totalEarned +=
                    item.usdAmount;
            }
            setEarn(totalEarned);
        });
    }, [proposals, walletAddress]);

    const checkChain = async () => {
        const chainState = protocol.chains.filter((chain) => chain.id == chainId);
        console.log(chainState);
        if (chainState.length == 0) {
            NotificationManager.error("Please change your network for protocol that you want", "Error");
        } else {
            navigate(protocol.href);
        }
    }
    return (
        <div className="item item-gap">
            <div className="flex justify-between items-center">
                <img width="50" src={protocol.icon}></img>
                <div className="chains">
                    {protocol.chains.map((chain, key) => {
                        return (
                            <img width="30" src={chain.name} style={{ right: `${key * 13}px` }}></img>
                        )
                    })}
                </div>
            </div>
            <h2 className="item-font-2">{protocol.text}</h2>
            <div>
                <p className="item-font-1">Active Proposals</p>
                <h4>{count}</h4>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="item-font-1">Total Rewards</p>
                    <h4>${earn}</h4>
                </div>
                <Button
                    onClick={checkChain}
                    variant="contained" color="tealLight"
                >
                    View
                </Button>
            </div>
        </div>
    )
}
export default Item;