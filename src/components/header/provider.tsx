import Web3Modal from "web3modal";
import { providerOptions } from "../../providerOptions";

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions, // required
});

const Provider = async () => {
    const provider = await web3Modal.connect();
    return provider;
}

export default Provider;