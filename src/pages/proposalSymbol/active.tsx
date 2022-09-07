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
    // @ts-ignore
    const filteredProposals = proposalState.currentProposal.data;

    return (
        <ProposalCardActiveSymbol
            protocol={symbol}
            proposals={filteredProposals}
            isHistory={isHistory}
        />
    );
};

export default ActiveProposals;
