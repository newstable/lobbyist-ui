import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVERENDPOINT;

const proposal_registry = async (param: any, name: String) => {
    try {
        var res = await axios.post("/api/proposal-registry", {
            param: param,
            name: name,
        });

        return res.data.success;
    } catch (err: any) {
        return false;
    }
};

const proposal_load = async (name: String) => {
    try {
        var res = await axios.post("/api/load-proposal", {
            name: name,
        });

        return res.data.data;
    } catch (err: any) {
        return false;
    }
};

// Export Functions
const Action = {
    proposal_registry,
    proposal_load,
};

export default Action;
