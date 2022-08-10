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
            infuraId: "9f8f5ec266c54f85aa9e66fbe230b077" // Required unless you provide a JSON RPC url; see `rpc` below
        }
    },
    walletconnect: {
        package: WalletConnect, // required
        options: {
            infuraId: "9f8f5ec266c54f85aa9e66fbe230b077" // required
        }
    },
    portis: {
        package: Portis, // required
        options: {
            id: "1a686526-b1c5-4e2f-ba28-3cf324586987" // required
        }
    },
    fortmatic: {
        package: Fortmatic, // required
        options: {
            key: "pk_live_0A4CED6B972BF120" // required
        }
    }
};
