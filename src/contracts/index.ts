import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");

const RPCS = {
    1:"https://mainnet.infura.io/v3/",
    10:"https://mainnet.optimism.io",
    137:"https://polygon-rpc.com",
    250:"https://rpc.ftm.tools",
    42161:"https://arb1.arbitrum.io/rpc"
};
const providers = {
    "Ethereum": new ethers.providers.JsonRpcProvider(RPCS[1]),
    "Optimism": new ethers.providers.JsonRpcProvider(RPCS[10]),
    "Polygon": new ethers.providers.JsonRpcProvider(RPCS[137]),
    "Fantom": new ethers.providers.JsonRpcProvider(RPCS[250]),
    "Arbitrum": new ethers.providers.JsonRpcProvider(RPCS[42161]),
};

const POOLContract = (e:any)=>{
    const contract = new ethers.contract(
        Addresses[e.chain],
        Abis.Pool,
        e.signer
    );
    return contract;
}

const ERCContract = (e: any) => {
    const result = new ethers.Contract(
        e, Abis.ERC20, providers["Polygon"]
    )
    return result;
}
export {
    POOLContract,
    ERCContract,
    providers
};
