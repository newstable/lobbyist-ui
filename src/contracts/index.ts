import { Api } from "@mui/icons-material";
import { ethers } from "ethers";

const Abis = require("./contracts/abis.json");
const Addresses = require("./contracts/addresses.json");

const RPCS = {
    1:"https://eth.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    10:"https://op.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    56:"https://bsc.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    137:"https://matic.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    250:"https://ftm.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    42161:"https://arbitrum.getblock.io/mainnet/?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5",
    43114:"https://avax.getblock.io/mainnet/ext/bc/C/rpc?api_key=8dbb37b0-802c-4ed0-9296-e9823ca0d8b5"
};
const providers = {
    "Ethereum": new ethers.providers.JsonRpcProvider(RPCS[1]),
    "Optimism": new ethers.providers.JsonRpcProvider(RPCS[10]),
    "Binance": new ethers.providers.JsonRpcProvider(RPCS[56]),
    "Polygon": new ethers.providers.JsonRpcProvider(RPCS[137]),
    "Fantom": new ethers.providers.JsonRpcProvider(RPCS[250]),
    "Arbitrum": new ethers.providers.JsonRpcProvider(RPCS[42161]),
    "Avalanche": new ethers.providers.JsonRpcProvider(RPCS[43114]),
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
