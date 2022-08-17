import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Portis from "@portis/web3";
import Fortmatic from "fortmatic";
// import Squarelink from "squarelink";

export const providerOptions = {
    walletlink: {
        package: CoinbaseWalletSDK, // Required
        options: {
            appName: "Web 3 Modal Demo", // Required
            infuraId: process.env.REACT_APP_INFURA_KEY, // Required unless you provide a JSON RPC url; see `rpc` below
        },
    },
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: process.env.REACT_APP_INFURA_KEY, // required
        },
    },
    portis: {
        package: Portis, // required
        options: {
            id: "1a686526-b1c5-4e2f-ba28-3cf324586987", // required
        },
    },
    fortmatic: {
        package: Fortmatic, // required
        options: {
            key: process.env.REACT_APP_FORTMATIC, // required
        },
    },
};
