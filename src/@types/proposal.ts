import { Protocol } from "./protocol";

export type Matic = {
  total: number;
  votes: number;
  amount: number;
};

export type Proposal = {
  name: string;
  protocol: Protocol;
  isActive: boolean;
  reward: number;
  type: EnumProposalType;
  kpi: EnumProposalKpi;
  voteIncentive?: boolean;
  totalValue: number;
  userVote: number;
  userShare: number;
  matic: Matic;
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
  currentProposal: Proposal | null;
};
