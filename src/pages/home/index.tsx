import { Box } from "@mui/material";
import {
	CardRewards,
	ProposalCardActive,
	ProposalCardCreated,
} from "../../components";
import { useSelector, RootState } from "../../redux/store";
import { Proposal } from "../../@types/proposal";


type Props = {};

const Homepage = (props: Props) => {

	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	// @ts-ignore
	const filteredProposals: Proposal[] = useSelector((state: RootState) => state.proposal.currentProposal.data);
	return (
		<Box className="main-body flex flex-col grow">
			<Box className="flex flex-col min-h-full main-content gap-14 mb-16">
				<CardRewards activeProposals={filteredProposals} />
				<ProposalCardActive address={walletAddress} proposals={filteredProposals} />
				<ProposalCardCreated proposals={filteredProposals} address={walletAddress} />
			</Box>
		</Box>
	);
};

export default Homepage;
