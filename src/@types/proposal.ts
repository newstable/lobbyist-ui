import { Protocol } from "./protocol";

export type Matic = {
  total: number;
  votes: number;
  amount: number;
};

export type Proposal = {
  type: string;
  name: string;
  description: string;
  protocol: string;
  isClosed: boolean;
  reward: number;
  rewardCurrency: string;
  voteIncentive?: boolean;
  address: string;
  proposalId: string;
  totalVoteWeight: number;
  poolId: number;
  votes: number;
  myvoteAmount: number;
  myclaim: boolean;
};

export type NewProposal = {
  proposalId: string,
  name: string,
  description: string,
  platformType: string,
  outcome: string,
  rewardCurrency: string,
  rewardAmount: number,
  creator: string,
  isClosed: boolean,
  paybackAmount: number
}

export type ActiveProposal = {
  type: string;
  name: string;
  description: string;
  protocol: string;
  isClosed: boolean;
  reward: number;
  rewardCurrency: string;
  address: string;
  proposalId: string;
  totalVoteWeight: number;
  poolId: number;
  votes: number;
  claim: boolean;
}

export enum EnumProposalType {
  gauge = "Gauge",
  governance = "Governance",
}

export enum EnumProposalKpi {
  fixed = "Fixed",
  variable = "Variable",
}

export type ProposalState = {
  activeProposals: Proposal[];
  historyProposals: Proposal[];
  currentProposal: Proposal[];
};
