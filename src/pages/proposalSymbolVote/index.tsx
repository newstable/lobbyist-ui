import { Box, Button, Grid, Link, Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { EnumProtocolName } from "../../@types/protocol";
import classNames from "classnames";
import styles from "../../components/form/styles.module.scss";
import { colors } from "../../common";
import { Remarkable } from 'remarkable';
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
import tokens from "../../token.json";
import { Coins } from "../../blockchain";
import { History } from "../../@types/proposal";

var md = new Remarkable();
var history: History[] = [];
if (localStorage.getItem('history')) {
	var data = JSON.parse(`${localStorage.getItem('history')}`);
	data.forEach((element: any) => {
		history.push({
			type: element.type,
			rewardCurrency: element.rewardCurrency,
			address: element.address
		});
	});
}

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
	const [currency, setRewardCurrency] = useState("");
	const [currencyApi, setRewardCurrencyApi] = useState("");
	const [usdAmount, setUsdAmount] = useState(0);

	const isProposer = searchParams.get("proposer") && true;
	const [showMore, setShowMore] = useState(true);
	const [description, setDescription] = useState("");
	const navState = location.state as any;
	let { proposal: currentProposal } = navState;

	useEffect(() => {
		var rewardCurrency = tokens.filter(token => token.address == currentProposal.rewardCurrency);
		setRewardCurrency(rewardCurrency[0].display);
		setRewardCurrencyApi(rewardCurrency[0].api);
		setDescription(md.render(currentProposal.description));
	}, [currentProposal])

	useEffect(() => {
		GetInfo();
	}, [walletAddress])

	useEffect(() => {
		setUsdAmount(0);
	}, [modal])

	const GetInfo = async () => {
		const proposalinfo = await getProposal({
			variables: { id: currentProposal.proposalId }
		})
		setProposalInfo(proposalinfo.data.proposal);
		const req = {
			strategies: proposalinfo.data.proposal.strategies,
			snapshot: proposalinfo.data.proposal.snapshot,
			space: proposalinfo.data.proposal.space.id,
			address: walletAddress,
			network: proposalinfo.data.proposal.network
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
			let choice: any;
			if (proposalInfo.type == "single-choice") {
				choice = proposalInfo.choices.indexOf(currentProposal.protocol) + 1
			} else {
				choice = { [proposalInfo.choices.indexOf(currentProposal.protocol) + 1]: 1 };

			}
			const receipt = await client.vote(web3, account, {
				space: proposalInfo.space.id,
				proposal: proposalInfo.id,
				type: proposalInfo.type,
				choice: choice,
				reason: 'This choice makes a lot of sense',
				app: 'Lobbyist'
			});
			if (receipt) {
				history.push({
					type: "Vote",
					rewardCurrency: "",
					address: walletAddress
				})
				localStorage.setItem("history", JSON.stringify(history));
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
		if (addrewardButton) {
			handleClose();
		}
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

	const onChangeAmount = async (amount: string) => {
		setAddRewardAmount(Number(amount));
		var result = await Coins(currencyApi);
		setUsdAmount(result * Number(amount));
	}

	return (
		<>
			<Box className="main-body flex flex-col grow">
				<Box className="flex flex-col main-content gap-14 margindw">
					<Box className="gapbtm flex justify-between proposer-flex">
						<NavBack />
						{isProposer ? (
							<Box className="flex gap-8">
								<Button onClick={() => setModal(true)} className="proposer-button" variant="contained" color="tealLight">
									Add Rewards
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
						<Box className="flex flex-col mt-12">
							<Box className="flex flex-col">
								<Typography variant="h5">{navState.proposal.name}</Typography>
								<Typography color={colors.textGray}>
									{showMore ? (
										<div className="description" dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}></div>
									) : <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>}
								</Typography>
								{description.length > 80 ? (
									<Button color="inherit" className="load-button" onClick={() => setShowMore(!showMore)}>{showMore ? "Show more" : "Show less"}</Button>
								) : ""
								}
							</Box>
							<Box className="flex flex-col gap-8">
								<Typography className="vpa">MY AVAILABLE VOTING POWER: <strong className="currcol"> {voteWeight > 0 ? voteWeight.toFixed(2) + " " + proposalInfo.symbol : ""}</strong> </Typography>
							</Box>
							<Box className="flex flex-col gap-8">
								<ProposalCardVaultIncentive
									proposal={currentProposal}
									isProposer={isProposer}
									voteWeight={voteWeight}
								/>
								<ProposalCardVaultEmission
									proposal={currentProposal}
									currency={currency}
								/>
								<ProposalCardVaultReward
									proposal={currentProposal}
									isProposer={isProposer}
									voteWeight={voteWeight}
									voteType={proposalInfo.type}
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
				<DialogTitle className="modaladdpaper modaladdpaper-title">Add more rewards</DialogTitle>
				<DialogContent className="modaladdpapermid">
					<div className="modaladdpaper title">
						<div style={{ margin: "0 auto 0 0" }} className="modaladdpaper">
							<div>Reward Currency:&nbsp;</div>
							<div>{currency}</div>
						</div>
						<div style={{ margin: "0 0 0 auto" }} className="modaladdpaper">
							<div>USD Amount :&nbsp;</div>
							<div>{usdAmount.toFixed(2)}</div>
						</div>
					</div>
					<div className="modaladdpaper titlebtm">
						<div style={{ margin: "0 auto 0 0" }} className="modaladdpaper">
							<div>2.5% Lobbyist Fee:&nbsp;</div>
						</div>
						<div style={{ margin: "0 0 0 auto" }} className="modaladdpaper">
							<div>USD Amount :&nbsp;</div>
							<div>{usdAmount.toFixed(2)}</div>
						</div>
					</div>
				</DialogContent>
				<DialogContent className="modaladdpaper">
					<TextField
						className={classNames(styles.input)}
						id="reward"
						placeholder="Input your amount"
						type="number"
						fullWidth
						onChange={(e) => onChangeAmount(e.target.value)}
					>
					</TextField>
				</DialogContent>
				<DialogContent className="modaladdpaper">
					<Typography className="feedec">The fee will be deducted from the Max Reward on deposit</Typography>
				</DialogContent>
				<DialogActions className="modaladdpaperbtm">
					{addrewardButton ?
						<Button className="proposer-button" variant="contained" color="tealLight" onClick={() => { AddReward(); }}>Approve</Button>
						:
						<Button className="proposer-button" variant="contained" color="tealLight" onClick={() => { AddReward(); }}>Add Rewards</Button>
					}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ProposalSymbolVote;
