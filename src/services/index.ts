import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVERENDPOINT;

const proposal_registry = async (param: any) => {
    try {
        var res = await axios.post("/api/proposal-registry", {
            param: param,
        });

        return res.data.success;
    } catch (err: any) {
        return false;
    }
};

const Proposal_load = async () => {
    try {
        var res = await axios.post("/api/load-proposal");
        return res.data;
    } catch (err: any) {
        return false;
    }
};

// Export Functions
const Action = {
    proposal_registry,
    Proposal_load,
};

export default Action;
