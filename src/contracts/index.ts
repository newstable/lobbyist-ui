import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");

const RPCS = {
    1: "https://eth.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    10: "https://op.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    56: "https://bsc.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    137: "https://matic.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    250: "https://rpc.ftm.tools",
    42161: "https://arbitrum.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    43114: "https://avax.getblock.io/mainnet/ext/bc/C/rpc?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    80001: "https://polygon-testnet.public.blastapi.io"
};
const providers: any = {
    1: new ethers.providers.JsonRpcProvider(RPCS[1]),
    10: new ethers.providers.JsonRpcProvider(RPCS[10]),
    56: new ethers.providers.JsonRpcProvider(RPCS[56]),
    137: new ethers.providers.JsonRpcProvider(RPCS[137]),
    250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    42161: new ethers.providers.JsonRpcProvider(RPCS[42161]),
    43114: new ethers.providers.JsonRpcProvider(RPCS[43114]),
    80001: new ethers.providers.JsonRpcProvider(RPCS[80001]),
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
