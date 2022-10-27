import { toHex, truncateAddress } from "../../utils";
import { setChainName } from "../../redux/slices/chain";
import { dispatch } from "../../redux/store";



const switchNetwork = async (network: string, library: any, chain: string) => {
    try {
        console.log(library, chain, network);
        await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(network) }],
        });
        dispatch(setChainName(network));
        return true;
    } catch (switchError: any) {
        dispatch(setChainName(chain));
        if (switchError.code === 4902) {
            try {
                await library.provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: toHex("1"),
                            chainName: "Ethereum",
                            rpcUrls: ["https://mainnet.infura.io/v3/"],
                            blockExplorerUrls: ["https://etherscan.io"],
                        },
                    ],
                });
            } catch (addError) {
                throw addError;
            }
        }
    }
};

export default switchNetwork;