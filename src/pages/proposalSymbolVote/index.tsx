import { Box, Button, Grid, Link, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { EnumProtocolName } from "../../@types/protocol";
import { colors } from "../../common";
import {
	NavBack,
	ProposalCardVaultEmission,
	ProposalCardVaultIncentive,
	ProposalCardVaultReward,
	TimeRemaining,
} from "../../components";
import { useSelector } from "../../redux/store";
import { RootState } from "../../redux/store";
import { GET_PROPOSAL } from "../../gql";
import { useLazyQuery } from "@apollo/client";
import proposal from "../../redux/slices/proposal";
import { Web3Provider } from '@ethersproject/providers';
import snapshot from '@snapshot-labs/snapshot.js';
import Action from "../../services";
import { ethers } from "ethers";
import { NotificationManager } from 'react-notifications';
import { addRewards } from "../../blockchain";

type Props = {};

const hub = 'https://hub.snapshot.org';
const client = new snapshot.Client712(hub);

const ProposalSymbolVote = (props: Props) => {
	const walletAddress: any = useSelector(
		(state: RootState) => state.wallet.address
	);
	const navigate = useNavigate();
	const [getProposal] = useLazyQuery(GET_PROPOSAL);
	const [voteWeight, setVoteWeight] = useState(0);
	const [proposalInfo, setProposalInfo]: any = useState([]);
	const [modal, setModal] = useState(false);
	const [addRewardAmount, setAddRewardAmount] = useState(0);
	const location = useLocation();
	const { symbol } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [addrewardButton, setButton] = useState(true);

	const isProposer = searchParams.get("proposer") && true;
	const navState = location.state as any;
	let { proposal: currentProposal } = navState;

	useEffect(() => {
		GetInfo();
	}, [])

	const GetInfo = async () => {
		const proposalinfo = await getProposal({
			variables: { id: currentProposal.proposalId }
		})
		console.log(proposalinfo.data.proposal);
		setProposalInfo(proposalinfo.data.proposal);
		const req = {
			strategies: proposalinfo.data.proposal.strategies,
			snapshot: proposalinfo.data.proposal.snapshot,
			space: proposalinfo.data.proposal.space.id,
			address: walletAddress
		}
		const result = await Action.GetVoteWeight(req);
		setVoteWeight(result.vp);
	}

	const voteProposal = async () => {
		try {
			if (!walletAddress) {
				NotificationManager.error("Oops, Please connect wallet and try again!");
				return;
			}
			var data = {
				voter: walletAddress,
				poolId: currentProposal.poolId,
				voteAmount: voteWeight,
				proposalId: currentProposal.proposalId
			}
			const web3 = new Web3Provider(window.ethereum);
			const [account] = await web3.listAccounts();
			const receipt = await client.vote(web3, account, {
				space: proposalInfo.space.id,
				proposal: proposalInfo.id,
				type: proposalInfo.type,
				choice: proposalInfo.choices.indexOf(currentProposal.protocol) + 1,
				reason: 'This choice makes a lot of sense',
				app: 'Lobbyist'
			});
			if (receipt) {
				const result: any = await Action.Vote(data);
				if (result.status) {
					NotificationManager.success("Voted Successfully", "Success");
					navigate(`/proposal/${symbol}`);
				} else {
					NotificationManager.error("You already voted", "Error");
				}
			}
		} catch (error: any) {
			NotificationManager.error(`Oops,${error.error_description}`, "Error");
			console.log(error.error_description);
		}
	}

	const AddReward = async () => {
		const result: any = await addRewards({
			id: currentProposal.poolId,
			amount: addRewardAmount,
			rewardtype: currentProposal.rewardCurrency,
			walletAddress: walletAddress,
			buttonType: addrewardButton
		});
		if (!result.status) {
			NotificationManager.error(result.message, "Error");
		} else {
			setButton(false);
			NotificationManager.success(result.message, "Success");
		}
	}

	const handleClose = () => {
		setModal(false);
	};

	return (
		<>
			<Box className="main-body flex flex-col grow">
				<Box className="flex flex-col main-content gap-14 margindw">
					<Box className="flex justify-between proposer-flex">
						<NavBack />
						{isProposer ? (
							<Box className="flex gap-8">
								<Button onClick={() => setModal(true)} className="proposer-button" variant="contained" color="tealLight">
									Add Rewards
								</Button>
								<Button onClick={() => setModal(true)} className="proposer-button" variant="contained" color="tealLight">
									Clawback
								</Button>
							</Box>
						) : (
							<Box className="flex gap-8">
								<Button onClick={() => setModal(true)} className="proposer-button" variant="contained" color="tealLight">
									Add Rewards
								</Button>
								{voteWeight == 0 ? (
									<Button disabled variant="contained" color="secondary">
										Vote
									</Button>

								) : (
									<Button onClick={voteProposal} variant="contained" color="tealLight">
										Vote
									</Button>
								)}
							</Box>
						)
						}
					</Box>
				</Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box className="flex flex-col gap-12 mt-12">
							<Box className="flex flex-col">
								<Typography variant="h6">{navState.proposal.name}</Typography>
								<Typography color={colors.textGray}>
									{navState.proposal.description.length > 80 ? (navState.proposal.description.slice(0, 80) + "...") : navState.proposal.description}
								</Typography>
							</Box>
							<Box className="flex flex-col gap-8">
								<ProposalCardVaultIncentive
									proposal={currentProposal}
									isProposer={isProposer}
									voteWeight={voteWeight}
								/>
								<ProposalCardVaultEmission
									proposal={currentProposal}
									isProposer={isProposer}
								/>
								<ProposalCardVaultReward
									proposal={currentProposal}
									isProposer={isProposer}
								/>
							</Box>
						</Box>
					</Grid>
					<Grid item xs={12} md={6} className="flex !flex-col">
						<TimeRemaining time={proposalInfo.end * 1000}></TimeRemaining>
						<Box className="relative flex flex-auto">
							<Box className="flex flex-col flex-auto gap-2 text-center pt-6 md:text-right md:pt-0 md:absolute md:right-0 md:bottom-0">
								<Link href={"https://snapshot.org/#/" + symbol + ".eth" + "/proposal/" + proposalInfo.id}>Go to Snapshot</Link>
								<Link href={"/proposal/" + symbol}>
									Go to{" "}
									{`${EnumProtocolName[symbol as keyof typeof EnumProtocolName]}`}
								</Link>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Box className="mt-16 mb-32"></Box>
			</Box >
			<Dialog className="modaladd" open={modal} onClose={handleClose}>
				<DialogTitle className="modaladdpaper">Add more rewards to the proposal</DialogTitle>
				<DialogContent className="modaladdpaper">
					<TextField
						autoFocus
						margin="dense"
						id="reward"
						label="Reward Amount"
						type="number"
						fullWidth
						variant="standard"
						onChange={(e) => setAddRewardAmount(Number(e.target.value))}
					>
					</TextField>
				</DialogContent>
				<DialogActions className="modaladdpaper">
					{addrewardButton ?
						<Button onClick={() => { AddReward(); }}>Approve</Button>
						:
						<Button onClick={() => { handleClose(); AddReward(); }}>Add Rewards</Button>
					}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProposalSymbolVote;
