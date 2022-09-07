import { Box } from "@mui/material";
import {
	CardRewards,
	ProposalCardActive,
	ProposalCardCreated,
} from "../../components";
import { useEffect, useState } from "react";
import { useSelector, RootState } from "../../redux/store";
import { dispatch } from "../../redux/store";
import { setActiveProposal } from "../../redux/slices/activeProposal";
import Action from "../../services";
import { Proposal, ActiveProposal } from "../../@types/proposal";

type Props = {};

const Homepage = (props: Props) => {
	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	const proposalState = useSelector((state) => state.proposal);
	// @ts-ignore
	const filteredProposals: any = proposalState.currentProposal.data;

	useEffect(() => {
		getMyProposals();
	}, [walletAddress]);
	const getMyProposals = async () => {
		var result = await Action.GetMyProposals({
			address: walletAddress,
		});
		setActiveProposal(result.data);
		setTimeout(() => {
			getMyProposals();
		}, 2000);
	}
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
