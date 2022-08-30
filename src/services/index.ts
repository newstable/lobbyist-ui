import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVERENDPOINT;

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
    Proposal_load,
};

export default Action;
