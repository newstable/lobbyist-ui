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
import { Proposal, ActiveProposal } from "../../../@types/proposal";
import { TextContent, TextHead } from "../../text";
import NumberType from "../../../common/number";
import { useNavigate } from "react-router-dom";
import { Claim } from "../../../blockchain";
import { NotificationManager } from 'react-notifications';

type Props = {
	proposals: ActiveProposal[];
	address: string;
};

const Content = styled(CardContent)(({ theme }) => ({}));

const ProposalCardActive = (props: Props) => {
	const { proposals, address } = props;
	let { symbol } = useParams();
	const navigate = useNavigate();
	const onJoinClick = (proposal: ActiveProposal, idx: number) => {
		const path = idx % 2 === 0 ? "proposal/" + proposal.type + "/vote" : "proposal/" + proposal.type + "/vote?proposer=1";
		navigate(path, {
			state: {
				proposal,
			},
		});
	};
	const onClaim = async (e: number) => {
		var result = await Claim({ id: e, address: address });
		if (result.status) {
			NotificationManager.success(result.message, "Success");
		} else {
			NotificationManager.error(result.message, "Success");
		}
	}
	const theme = useTheme();
	const isAboveMd = useMediaQuery(theme.breakpoints.up("smd"));
	const colHeads = ["Title", "Vote Incentives", "Total Votes", "$/Vote", ""];
	return (
		<Card className="">
			<ProposalCardHeader title="My active proposals"></ProposalCardHeader>
			<Content className="!p-0">
				<Box
					className={classNames(
						"grid grid-cols-5 gap-8 px-6 mb-8",
						!isAboveMd && "hidden"
					)}
				>
					{colHeads.map((c, idx) => (
						<Box key={`colHead_${idx}`}>
							<TextHead>{c}</TextHead>
						</Box>
					))}
				</Box>
				<Box className="flex flex-col gap-4">
					{proposals?.map((p, idx) => (
						<Box key={`prop_${idx}`} className="p-6 bg-black rounded-md">
							<Box
								className={classNames(
									"grid gap-8",
									isAboveMd ? "grid-cols-5" : "grid-cols-2"
								)}
							>
								<Box
									className={classNames("flex flex-col", !isAboveMd && "gap-1")}
								>
									<TextHead className={classNames(isAboveMd && "hidden")}>
										{colHeads[0]}
									</TextHead>
									<TextContent>{p.name.length > 20 ? (p.name.slice(0, 20) + "...") : p.name}</TextContent>
								</Box>
								<Box
									className={classNames("flex flex-col", !isAboveMd && "gap-1")}
								>
									<TextHead className={classNames(isAboveMd && "hidden")}>
										{colHeads[1]}
									</TextHead>
									<TextContent>${NumberType(p.reward)}</TextContent>
								</Box>
								<Box
									className={classNames(
										"flex flex-col",
										!isAboveMd && "gap-1 col-span-3"
									)}
								>
									<TextHead className={classNames(isAboveMd && "hidden")}>
										{colHeads[2]}
									</TextHead>
									<TextContent>{NumberType(p.votes)}</TextContent>
								</Box>
								<Box
									className={classNames("flex flex-col", !isAboveMd && "gap-1")}
								>
									<TextHead className={classNames(isAboveMd && "hidden")}>
										{colHeads[3]}
									</TextHead>
									<TextContent>${p.votes == 0 ? ("0") : (
										(p.reward / p.votes).toFixed(2)
									)}</TextContent>
								</Box>
								<Box
									className={classNames("flex", isAboveMd && "justify-center")}
								>
									{!p.isClosed ? (
										<Button variant="contained" color="tealLight" onClick={() => onJoinClick(p, idx)}>
											View
										</Button>
									) : !p.claim ? (
										<Button variant="contained" color="tealLight" onClick={() => onClaim(p.poolId)}>
											Claim
										</Button>
									) : <></>}
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Content>
		</Card>
	);
};

export { ProposalCardActive };
