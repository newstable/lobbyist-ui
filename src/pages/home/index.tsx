import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {
	CardRewards,
	ProposalCardActive,
	ProposalCardCreated,
} from "../../components";
import { useSelector, RootState } from "../../redux/store";
import Action from "../../services";
import { ActiveProposal } from "../../@types/proposal";

type Props = {};

const Homepage = (props: Props) => {
	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	const [activeProposal, setActiveProposal] = useState<ActiveProposal[]>([]);
	const proposalState = useSelector((state) => state.proposal);
	// @ts-ignore
	const filteredProposals = proposalState.currentProposal.data;
	useEffect(() => {
		getMyProposals();
	}, [walletAddress]);
	const getMyProposals = async () => {
		var result = await Action.GetMyProposals({
			address: walletAddress,
		});
		setActiveProposal(result.data);
	}
	return (
		<Box className="main-body flex flex-col grow">
			<Box className="flex flex-col min-h-full main-content gap-14 mb-16">
				<CardRewards />
				<ProposalCardActive proposals={activeProposal} address={walletAddress} />
				<ProposalCardCreated proposals={filteredProposals} address={walletAddress} />
			</Box>
		</Box>
	);
};

export default Homepage;
