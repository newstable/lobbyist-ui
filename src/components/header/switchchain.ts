import { toHex, truncateAddress } from "../../utils";

const switchNetwork = async (network: string, library: any) => {
    try {
        await library.provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: toHex(network) }],
        });
    } catch (switchError: any) {
        if (switchError.code === 4902) {
            try {
                await library.provider.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId: toHex("137"),
                            chainName: "Polygon",
                            rpcUrls: ["https://polygon-rpc.com/"],
                            blockExplorerUrls: ["https://polygonscan.com/"],
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