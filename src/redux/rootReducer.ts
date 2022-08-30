import { combineReducers } from "redux";
// slices
import proposalReducer from "./slices/proposal";
import walletReducer from "./slices/wallet";
import clickProposalReducer from "./slices/clickProposal";
import clickTokenReducer from "./slices/clickToken";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer,
    clickProposal: clickProposalReducer,
    clickToken: clickTokenReducer,
});

export { rootReducer };
