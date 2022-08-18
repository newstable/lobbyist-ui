import { useEffect, useState } from "react";
import { useSelector } from "../../redux/store";
import { ProposalCardActiveSymbol } from "../../components";
import { ProtocolsList } from "../../@types/protocol";
import Action from "../../services";

type Props = {
    symbol: string;
};

const ActiveProposals = ({ symbol }: Props) => {
    const [data, setData] = useState([]);
    const proposalState = useSelector((state) => state.proposal);

    const filteredProtocol = ProtocolsList.filter((p) => p.symbol === symbol);

    useEffect(() => {
        (async () => {
            const result = await Action.proposal_load(symbol);
            setData(result[symbol.toUpperCase()]);
        })();
        console.log(proposalState.activeProposals);
    }, []);

    const filteredProposals = proposalState.activeProposals.filter(
        (ap) => ap.protocol.symbol === symbol
    );

    if (filteredProtocol.length === 0) {
        // TODO: return as we did not find correct protocol
    }

    return (
        <ProposalCardActiveSymbol
            protocol={filteredProtocol[0]}
            proposals={filteredProposals}
        />
    );
};

export default ActiveProposals;
