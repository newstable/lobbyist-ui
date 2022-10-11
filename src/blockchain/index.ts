import axios from "axios";
import { ethers } from "ethers";
import { ERCContract, POOLContract, VariableContract } from "../contracts";
import Addresses from "../contracts/contracts/addresses.json";
import variableAddresses from "../contracts/contracts/variableAddresses.json";
import { Tokens } from "../token";
import { History } from "../@types/proposal";
import { Chainscan } from "../chainscan";
var history: History[] = [];

if (localStorage.getItem('history')) {
    var data = JSON.parse(`${localStorage.getItem('history')}`);
    data.forEach((element: any) => {
        history.push({
            type: element.type,
            chain: element.chain,
            rewardCurrency: element.rewardCurrency,
            address: element.address
        });
    });
}

type Props = {
    address: string;
    walletAddress: string;
    value: any;
    submitType: boolean;
    signer: any;
    chain: string;
}

const createProposal = async (props: any) => {
    try {
        const { address, walletAddress, value, submitType, signer, chain }: Props = props;
        var rewardCurrency = Tokens[chain].filter((token: any) => token.address == address);
        const newProposal = {
            proposalId: value.proposalId,
            name: value.proposalName,
            description: value.proposalDescription,
            platformType: value.platformType,
            outcome: value.desiredVote,
            rewardCurrency: value.rewardCurrency,
            rewardAmount: ethers.utils.parseUnits(value.payout),
            creator: value.userAddress,
            isClosed: false
        }
        const Reward = ERCContract({ address, chain });
        const result = await Reward.balanceOf(walletAddress);
        const tokenAmount = ethers.utils.formatUnits(result);
        if (Number(tokenAmount) < Number(value.payout)) {
            return ({ status: false, message: "Your reward balance is not enough!" });
        } else if (!submitType) {
            const ERCContract = Reward.connect(signer);
            // @ts-ignore
            var tx = await ERCContract.approve(Addresses[chain], ethers.utils.parseUnits(value.payout));
            await tx.wait();
            history.push({
                type: "Approve",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                address: walletAddress
            });
            localStorage.setItem("history", JSON.stringify(history));
            return ({ status: true, message: "Successfully approved!" });
        } else if (submitType) {
            const poolContract = POOLContract({ chain, signer });
            const Pool = poolContract.connect(signer);
            const connectContract = await Pool.createPool(newProposal, { value: ethers.utils.parseEther("0.01") });
            await connectContract.wait();
            history.push({
                type: "createPool",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                // @ts-ignore
                address: Addresses[chain]
            });
            localStorage.setItem("history", JSON.stringify(history));
            return ({ status: true, message: "Successfully created!" });
        }
    } catch (err: any) {
        console.log(err.message)
        return ({ status: false, message: "Something Wrong! Please try again!" });
    }
}

const createVariable = async (props: any) => {
    try {
        const { address, walletAddress, value, submitType, signer, chain }: Props = props;
        var rewardCurrency = Tokens[chain].filter((token: any) => token.address == address);
        let totalRewardAmount = value.minReward * value.targetVotes;
        const newProposal = {
            proposalId: value.proposalId,
            name: value.proposalName,
            description: value.proposalDescription,
            platformType: value.platformType,
            outcome: value.desiredVote,
            rewardCurrency: value.rewardCurrency,
            rewardAmount: ethers.utils.parseUnits(totalRewardAmount.toString()),
            minVotes: ethers.utils.parseUnits(value.minVotes),
            targetVotes: ethers.utils.parseUnits(value.targetVotes),
            creator: value.userAddress,
            isClosed: false
        }
        const Reward = ERCContract({ address, chain });
        const result = await Reward.balanceOf(walletAddress);
        const tokenAmount = ethers.utils.formatUnits(result);
        if (Number(tokenAmount) < totalRewardAmount) {
            return ({ status: false, message: "Your reward balance is not enough!" });
        } else if (!submitType) {
            const ERCContract = Reward.connect(signer);
            // @ts-ignore
            var tx = await ERCContract.approve(variableAddresses[chain], ethers.utils.parseUnits(totalRewardAmount.toString()));
            await tx.wait();
            history.push({
                type: "Approve",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                address: walletAddress
            });
            localStorage.setItem("history", JSON.stringify(history));
            return ({ status: true, message: "Successfully approved!" });
        } else if (submitType) {
            const variableContract = VariableContract({ chain, signer });
            // const variable = variableContract.connect(signer);
            const connectContract = await variableContract.createPool(newProposal, { value: ethers.utils.parseEther((0.01 * value.targetVotes / value.minVotes).toString()) });
            await connectContract.wait();
            history.push({
                type: "createPool",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                // @ts-ignore
                address: variableAddresses[chain]
            });
            localStorage.setItem("history", JSON.stringify(history));
            return ({ status: true, message: "Successfully created!" });
        }
    } catch (err: any) {
        console.log(err.message)
        return ({ status: false, message: "Something Wrong! Please try again!" });
    }
}

const addRewards = async (props: any) => {
    try {
        const { id, amount, rewardtype, walletAddress, buttonType, signer, chain, type } = props;
        var rewardCurrency = Tokens[chain].filter((token: any) => token.address == rewardtype);
        let ContractAddress: any;
        let Contract: any;
        if (type == "variable") {
            ContractAddress = variableAddresses;
            Contract = VariableContract;
        } else {
            ContractAddress = Addresses;
            Contract = POOLContract;
        }
        const Reward = ERCContract({ address: rewardtype, chain: chain });
        const myBalance = await Reward.balanceOf(walletAddress);
        const tokenAmount = ethers.utils.formatUnits(myBalance);
        if (Number(tokenAmount) < amount) {
            return ({ status: false, message: "Your reward balance is not enough!" });
        }
        else if (buttonType) {
            const erc = Reward.connect(signer);
            // @ts-ignore
            var tx = await erc.approve(ContractAddress[chain], ethers.utils.parseUnits(amount.toString()));
            await tx.wait();
            history.push({
                type: "Approve",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                address: walletAddress
            });
            localStorage.setItem("history", JSON.stringify(history));
            return ({ status: true, message: "Successfully Approved!" });
        } else {
            const poolContract = Contract({ chain, signer });
            const Pool = poolContract.connect(signer);
            const connectContract = await Pool.addReward(id, ethers.utils.parseUnits(amount.toString()));
            await connectContract.wait();
            history.push({
                type: "Add Reward",
                chain: Chainscan[chain],
                rewardCurrency: rewardCurrency[0].display,
                // @ts-ignore
                address: ContractAddress[chain]
            });
            localStorage.setItem("history", JSON.stringify(history));
            var result = await axios.post("/api/addreward", { poolId: id, rewardAmount: amount, chain: chain, type: type });
            if (result.data.status)
                return ({ status: true, message: "Successfully Added!" });
        }
    } catch {
        return ({ status: false, message: "Something went wrong! Please check again!" });
    }
}

const Claim = async (props: any) => {
    try {
        const { id, address, walletAddress, signer, chain, type, claimAmount } = props;
        let Contract: any;
        let ContractAddress: any;
        if (type == "variable") {
            ContractAddress = variableAddresses;
            Contract = VariableContract;
        } else {
            ContractAddress = Addresses;
            Contract = POOLContract;
        }
        var rewardCurrency = Tokens[chain].filter((token: any) => token.address == address);
        const poolContract = Contract({ chain, signer });
        const Pool = poolContract.connect(signer);
        const connectContract = await Pool.claim(id);
        await connectContract.wait();
        history.push({
            type: "Claim",
            chain: Chainscan[chain],
            rewardCurrency: rewardCurrency[0].display,
            // @ts-ignore
            address: ContractAddress[chain]
        });
        localStorage.setItem("history", JSON.stringify(history));
        var result = await axios.post("/api/claim", { id: id, address: walletAddress, chain: chain, type: type, claimAmount: claimAmount });
        if (result.data.status)
            return ({ status: true, message: "Successfully Claimed!" });
        else {
            return ({ status: false, message: result.data.message });
        }
    } catch (error: any) {
        console.log(error.message);
        return ({ status: false, message: "Something went wrong! Please check again!" });
    }
}

const Coins = async (ids: string) => {
    try {
        var url = `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&x_cg_pro_api_key=${process.env.REACT_APP_COINGECKO_API}`;
        let data = await axios.get(url);
        return data.data[0].current_price;
    } catch (error: any) {
        return 0;
    }
}

export { createProposal, addRewards, Claim, Coins, createVariable };