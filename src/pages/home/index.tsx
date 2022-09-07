import { Box } from "@mui/material";
import {
	CardRewards,
	ProposalCardActive,
	ProposalCardCreated,
} from "../../components";
import { useEffect, useState } from "react";
import { useSelector, RootState } from "../../redux/store";
import Action from "../../services";
import { Proposal, ActiveProposal } from "../../@types/proposal";


type Props = {};

const Homepage = (props: Props) => {
	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	const proposals: ActiveProposal[] = useSelector(
		(state: RootState) => state.activeProposal.activeProposal
	);
	const proposalState = useSelector((state) => state.activeProposal);
	// @ts-ignore
	const filteredProposals: any = proposalState.currentProposal;

	useEffect(() => {
		getMyProposals();
	}, [walletAddress]);
	const getMyProposals = async () => {
		await Action.GetMyProposals({
			address: walletAddress,
		});
	}
	return (
		<Box className="main-body flex flex-col grow">
			<Box className="flex flex-col min-h-full main-content gap-14 mb-16">
				<CardRewards />
				<ProposalCardActive address={walletAddress} proposals={proposals} />
				<ProposalCardCreated proposals={filteredProposals} address={walletAddress} />
			</Box>
		</Box>
	);
};

export default Homepage;
