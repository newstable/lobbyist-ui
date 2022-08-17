import {
    EnumProposalType,
    EnumProposalKpi,
    Proposal,
} from "../@types/proposal";
import { EnumProtocolName } from "../@types/protocol";

export const _proposalsActive: Proposal[] = [
    {
        name: "Vault Incentive Gauge",
        protocol: {
            name: EnumProtocolName.qidao,
            symbol: "qidao",
        },
        isActive: true,
        reward: 56000,
        type: EnumProposalType.gauge,
        kpi: EnumProposalKpi.fixed,
        voteIncentive: false,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
    {
        name: "Vault Incentive Gauge",
        protocol: {
            name: EnumProtocolName.qidao,
            symbol: "qidao",
        },
        isActive: true,
        reward: 23000,
        type: EnumProposalType.gauge,
        kpi: EnumProposalKpi.variable,
        voteIncentive: true,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
    {
        name: "Aave",
        protocol: {
            name: EnumProtocolName.aave,
            symbol: "aave",
        },
        isActive: true,
        reward: 1200,
        type: EnumProposalType.governance,
        kpi: EnumProposalKpi.variable,
        voteIncentive: false,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
];

export const _proposalsHistory: Proposal[] = [
    {
        name: "Vault Incentive Gauge",
        protocol: {
            name: EnumProtocolName.qidao,
            symbol: "qidao",
        },
        isActive: true,
        reward: 45000,
        type: EnumProposalType.gauge,
        kpi: EnumProposalKpi.fixed,
        voteIncentive: false,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
    {
        name: "Aave",
        protocol: {
            name: EnumProtocolName.aave,
            symbol: "aave",
        },
        isActive: true,
        reward: 1000,
        type: EnumProposalType.governance,
        kpi: EnumProposalKpi.variable,
        voteIncentive: false,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
    {
        name: "Aave",
        protocol: {
            name: EnumProtocolName.aave,
            symbol: "aave",
        },
        isActive: true,
        reward: 3200,
        type: EnumProposalType.governance,
        kpi: EnumProposalKpi.variable,
        voteIncentive: false,
        totalValue: 28912,
        userVote: 30,
        userShare: 16,
        matic: {
            total: 280000,
            votes: 13,
            amount: 360,
        },
    },
];
