import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");

const supportChainId = 0x89;

const RPCS = {
    4002: "https://ftm-test.babylonswap.finance",
    0x89: "https://polygon-rpc.com",
    0x13881: "https://rpc-mumbai.maticvigil.com",
};
const providers = {
    0x13881: new ethers.providers.JsonRpcProvider(RPCS[0x13881]),
    0x89: new ethers.providers.JsonRpcProvider(RPCS[0x89]),
    4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
};

const provider = providers[supportChainId];

const poolContract = new ethers.Contract(
    Addresses.Pool,
    Abis.Pool,
    provider
)


const ERCContract = (e: any) => {
    const result = new ethers.Contract(
        e, Abis.ERC20, providers[0x13881]
    )
    return result;
}
export {
    poolContract,
    ERCContract,
    provider
};
