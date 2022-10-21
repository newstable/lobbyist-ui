import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");
const variableAddresses = require("./contracts/variableAddresses.json");

const RPCS = {
    1: "https://mainnet.infura.io/v3/9f8f5ec266c54f85aa9e66fbe230b077",
    10: "https://mainnet.optimism.io",
    56: "https://rpc-bsc.bnb48.club",
    137: "https://polygon-mainnet.infura.io/v3/9f8f5ec266c54f85aa9e66fbe230b077",
    250: "https://rpc.ftm.tools",
    42161: "https://arbitrum-mainnet.infura.io/v3/9f8f5ec266c54f85aa9e66fbe230b077",
    43114: "https://avalanche-mainnet.infura.io/v3/9f8f5ec266c54f85aa9e66fbe230b077"
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

const VariableContract = (e: any) => {
    const contract = new ethers.Contract(
        variableAddresses[e.chain],
        Abis.Variable,
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
    VariableContract,
    providers
};
