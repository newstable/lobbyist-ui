import { Protocol } from "./protocol";

export type Matic = {
  total: number;
  votes: number;
  amount: number;
};

export type Proposal = {
  name: string;
  protocol: string;
  isActive: boolean;
  reward: number;
  voteIncentive?: boolean;
  totalValue: number;
};

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
