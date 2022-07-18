import { useSelector } from "../../redux/store";
import { ProposalCardActiveSymbol } from "../../components";
import { ProtocolsList } from "../../@types/protocol";

type Props = {
  symbol: string;
};

const HistoryProposals = ({ symbol }: Props) => {
  const proposalState = useSelector(state => state.proposal);

  const filteredProposals = proposalState.historyProposals.filter(
    ap => ap.protocol.symbol === symbol
  );

  const filteredProtocol = ProtocolsList.filter(p => p.symbol === symbol);

  if (filteredProtocol.length === 0) {
    // TODO: return as we did not find correct protocol
  }

  return (
    <ProposalCardActiveSymbol
      protocol={filteredProtocol[0]}
      proposals={filteredProposals}
      isHistory
    />
  );
};

export default HistoryProposals;
