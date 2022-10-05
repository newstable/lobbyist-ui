import { Proposal } from "../../@types/proposal";
import "./index.scss";
import NumberType from "../../common/number";

const ChainImg: any = {
    1: "../../assets/chains/ethereum.svg",
    10: "../../assets/chains/optimism.png",
    56: "../../assets/chains/bsc.png",
    137: "../../assets/chains/polygon.svg",
    250: "../../assets/chains/fantom.png",
    42161: "../../assets/chains/arbitrum.png",
    43114: "../../assets/chains/avax.png"
}
type Props = {
    proposal: Proposal;
}
const Item = (props: Props) => {
    const { proposal } = props;
    return (
        <div className="item item-gap">
            <img width="30" src={ChainImg[proposal.chain]}></img>
            <h2 className="item-font-2">{proposal.name.length > 25 ? (proposal.name.slice(0, 25) + "...") : proposal.name}</h2>
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
                <h4>{proposal.totalVoteWeight}</h4>
            </div>
            <div>
                <p className="item-font-1">$/VOTE</p>
                <h4>{NumberType((proposal.usdAmount / proposal.totalVoteWeight).toFixed(6), 6)}</h4>
            </div>
        </div>
    )
}
export default Item;