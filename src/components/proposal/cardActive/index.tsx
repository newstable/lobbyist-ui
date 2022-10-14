import { Card } from "@mui/material";
import { ProposalCardHeader } from "../cardHeader";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import {
	CardContent,
	Box,
	Divider,
	Button,
	useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Proposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";
import { useNavigate } from "react-router-dom";
import { Claim } from "../../../blockchain";
import { useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications';
import { useSelector } from "../../../redux/store";
import { RootState } from "../../../redux/store";
import switchNetwork from "../../header/switchchain";

type Props = {
	address: string;
	proposals: Proposal[];
};

const ChainImg: any = {
	1: "../../assets/chains/eth.svg",
	10: "../../assets/chains/optimism.png",
	56: "../../assets/chains/bsc.png",
	137: "../../assets/chains/polygon.svg",
	250: "../../assets/chains/fantom.png",
	42161: "../../assets/chains/arbitrum.svg",
	43114: "../../assets/chains/avax.png"
}

const Content = styled(CardContent)(({ theme }) => ({}));

const Text_Head = styled(TextHead)(({ theme }) => ({
	fontSize: "100%"
}))

const ProposalCardActive = (props: Props) => {
	const provider: any = useSelector((state: RootState) => state.provider.provider);
	const { address, proposals } = props;
	const [myProposals, setMyProposals] = useState<Proposal[]>([]);
	const currentChain: any = useSelector(
		(state: RootState) => state.chain.id
	);

	useEffect(() => {
		var data = proposals?.filter(proposal => proposal.myclaim == false);
		setMyProposals(data);
	}, [proposals])
	const navigate = useNavigate();
	const onJoinClick = (proposal: Proposal, idx: number) => {
		const path = proposal.address !== address ? "proposal/" + proposal.type + "/vote" : "proposal/" + proposal.type + "/vote?proposer=1";
		navigate(path, {
			state: {
				proposal,
			},
		});
	};
	const onClaim = async (e: number, currency: string, chain: string, type: string) => {
		let signer: any = provider?.getSigner();
		if (currentChain == chain) {
			var result = await Claim({ id: e, address: currency, walletAddress: address, signer: signer, chain: chain, type: type });
			if (result.status) {
				NotificationManager.success(result.message, "Success");
			} else {
				NotificationManager.error(result.message, "Error");
			}
		} else {
			NotificationManager.error("Switch your chain to proposal Chain", "Error");
		}
	}
	const theme = useTheme();
	const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));
	const colHeads = ["Chain", "Title", "Voting For", "Rewards", "Votes", "$/Vote", ""];
	return (
		<Card className="" elevation={0}>
			<ProposalCardHeader title="My active proposals"></ProposalCardHeader>
			<Content className="!p-0">
				<Box
					className={classNames(
						"grid grid-cols-custom-7 gap-8 px-6 mb-8 dp:hidden"
					)}
				>
					{colHeads.map((c, idx) => (
						<Box key={`colHead_${idx}`}>
							<Text_Head>{c}</Text_Head>
						</Box>
					))}
				</Box>
				<Box className="flex flex-col gap-4">
					{
						myProposals?.map((p, idx) => (
							<Box key={`prop_${idx}`} className="p-6 bg-black rounded-md">
								<Box
									className={classNames(
										"grid gap-8",
										isAboveMd ? "grid-cols-custom-7" : "grid-cols-2"
									)}
								>
									<Box
										className={classNames("flex flex-col card-item", !isAboveMd && "gap-1")}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[0]}
										</Text_Head>
										<img width="23" src={ChainImg[p.chain]}></img>
									</Box>
									<Box
										className={classNames("flex flex-col justify-center", !isAboveMd && "gap-1")}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[1]}
										</Text_Head>
										<TextContent>{p.name.length > 23 ? (p.name.slice(0, 23) + "...") : p.name}</TextContent>
									</Box>
									<Box
										className={classNames("flex flex-col justify-center", !isAboveMd && "gap-1")}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[2]}
										</Text_Head>
										<TextContent>{p.choice.length > 23 ? (p.choice.slice(0, 23) + "...") : p.choice}</TextContent>
									</Box>
									<Box
										className={classNames("flex flex-col justify-center", !isAboveMd && "gap-1")}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[3]}
										</Text_Head>
										<TextContent>${NumberType(p.usdAmount.toFixed(2), 2)}</TextContent>
									</Box>
									<Box
										className={classNames(
											"flex flex-col justify-center",
											!isAboveMd && "gap-1 col-span-3"
										)}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[4]}
										</Text_Head>
										<TextContent>{NumberType(p.totalVoteWeight.toFixed(2), 2)}</TextContent>
									</Box>
									<Box
										className={classNames("flex flex-col justify-center", !isAboveMd && "gap-1")}
									>
										<Text_Head className={classNames(isAboveMd && "hidden")}>
											{colHeads[5]}
										</Text_Head>
										<TextContent>${p.totalVoteWeight == 0 ? ("0") : p.totalVoteWeight < 1 ? NumberType(p.usdAmount.toFixed(2), 2) : (
											NumberType((p.usdAmount / p.totalVoteWeight).toFixed(6), 6))}</TextContent>
									</Box>
									<Box
										className={classNames("flex", isAboveMd && "justify-center")}
									>
										{!p.isClosed ? (
											<Button variant="contained" color="tealLight" onClick={() => onJoinClick(p, idx)}>
												View
											</Button>
										) : !p.myclaim ? (
											<Button variant="contained" color="tealLight" onClick={() => onClaim(p.poolId, p.rewardCurrency, p.chain, p.proposalType)}>
												Claim
											</Button>
										) : <></>}
									</Box>
								</Box>
							</Box>
						))
					}
				</Box>
			</Content>
		</Card>
	);
};

export { ProposalCardActive };
