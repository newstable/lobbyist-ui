import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");

const RPCS = {
    1: "https://eth.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    10: "https://mainnet.optimism.io",
    56: "https://rpc-bsc.bnb48.club",
    137: "https://matic-mainnet-full-rpc.bwarelabs.com",
    250: "https://rpc.ftm.tools",
    42161: "https://rpc.ankr.com/arbitrum",
    43114: "https://api.avax.network/ext/bc/C/rpc"
};
const providers: any = {
    1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    10: new ethers.providers.JsonRpcProvider(RPCS[10]),
    56: new ethers.providers.JsonRpcProvider(RPCS[56]),
    137: new ethers.providers.JsonRpcProvider(RPCS[137]),
    250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    42161: new ethers.providers.JsonRpcProvider(RPCS[42161]),
    43114: new ethers.providers.JsonRpcProvider(RPCS[43114]),
};

const POOLContract = (e: any) => {
    const contract = new ethers.Contract(
        Addresses[e.chain],
        Abis.Pool,
        e.signer
    );
    return contract;
}

const ERCContract = (e: any) => {
    const result = new ethers.Contract(
        e.address, Abis.ERC20, providers[e.chain]
    )
    return result;
}
export {
    POOLContract,
    ERCContract,
    providers
};
