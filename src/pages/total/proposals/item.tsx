import { Proposal } from "../../../@types/proposal";
import "./index.scss";
import NumberType from "../../../common/number";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
const ChainImg: any = {
    1: "../../assets/chains/eth.svg",
    10: "../../assets/chains/optimism.png",
    56: "../../assets/chains/bsc.png",
    137: "../../assets/chains/polygon.svg",
    250: "../../assets/chains/fantom.png",
    42161: "../../assets/chains/arbitrum.svg",
    43114: "../../assets/chains/avax.png"
}
const ProtocolImg: any = {
    qidao: "../../assets/icons/pro-qidao.svg",
    aave: "../../assets/icons/pro-aave.svg",
    saddle: "../../assets/icons/saddle.svg",
    aura: "../../assets/icons/aura.svg",
    beethovenx: "../../assets/icons/beethovenx.svg",
    ribbon: "../../assets/icons/ribbon.svg",
    onx: "../../assets/icons/onx.svg"
}
type Props = {
    proposal: Proposal;
}
const ProposalItem = (props: Props) => {
    const navigate = useNavigate();
    const walletAddress: any = useSelector(
        (state: RootState) => state.wallet.address
    );
    const { proposal } = props;
    const onJoinClick = (proposal: Proposal) => {
        const path = proposal.address !== walletAddress ? "../proposal/" + proposal.type + "/vote" : "../proposal/" + proposal.type + "/vote?proposer=1";
        navigate(path, {
            state: {
                proposal,
            },
        });
    };
    return (
        <div className="item item-gap">
            <div className="flex justify-between">
                <img width="40" src={ProtocolImg[proposal.type]}></img>
                <img width="30" src={ChainImg[proposal.chain]}></img>
            </div>
            <h2 className="item-font-2">{proposal.name.length > 20 ? (proposal.name.slice(0, 20) + "...") : proposal.name}</h2>
            <div>
                <p className="item-font-1">VOTING FOR</p>
                <h4>{proposal.protocol}</h4>
            </div>
            <div>
                <p className="item-font-1">VOTE INCENTIVE</p>
                <h4>$ {NumberType((proposal.usdAmount).toString(), 2)}</h4>
            </div>
            <div>
                <p className="item-font-1">TOTAL VOTES</p>
                <h4>{NumberType((proposal.totalVoteWeight).toString(), 2)}</h4>
            </div>
            <div className="flex justify-between">
                <div>
                    <p className="item-font-1">$/VOTE</p>
                    <h4>{proposal.totalVoteWeight > 0 ? NumberType((proposal.usdAmount / proposal.totalVoteWeight).toFixed(6), 6) : ""}</h4>
                </div>
                <Button onClick={() => onJoinClick(proposal)}
                    variant="contained" color="tealLight"
                >
                    View
                </Button>
            </div>
        </div>
    )
}
export default ProposalItem;