import { Box } from "@mui/material";
import {
	CardRewards,
	ProposalCardActive,
	ProposalCardCreated,
} from "../../components";
import { useSelector, RootState } from "../../redux/store";

type Props = {};

const Homepage = (props: Props) => {
	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	const proposalState = useSelector((state) => state.proposal);
	// @ts-ignore
	const filteredProposals = proposalState.currentProposal.data;
	return (
		<Box className="main-body flex flex-col grow">
			<Box className="flex flex-col min-h-full main-content gap-14 mb-16">
				<CardRewards />
				<ProposalCardActive address={walletAddress} />
				<ProposalCardCreated proposals={filteredProposals} address={walletAddress} />
			</Box>
		</Box>
	);
};

export default Homepage;
