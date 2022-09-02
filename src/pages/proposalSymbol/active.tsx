import { useSelector } from "../../redux/store";
import { ProposalCardActiveSymbol } from "../../components";
import { ProtocolsList } from "../../@types/protocol";
import { useEffect } from "react";

type Props = {
    symbol: string;
    isHistory: boolean;
};

const ActiveProposals = ({ symbol, isHistory }: Props) => {
    const proposalState = useSelector((state) => state.proposal);

    // const filteredProtocol = ProtocolsList.filter((p) => p.symbol === symbol);

    // const filteredProposals = proposalState.currentProposal.filter(
    //     (ap) => console.log(ap)
    // );
    // @ts-ignore
    const filteredProposals = proposalState.currentProposal.data;

    // if (filteredProtocol.length === 0) {
    //     // TODO: return as we did not find correct protocol
    // }

    return (
        <ProposalCardActiveSymbol
            protocol={symbol}
            proposals={filteredProposals}
            isHistory={isHistory}
        />
    );
};

export default ActiveProposals;
