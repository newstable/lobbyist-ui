import { combineReducers } from "redux";
// slices
import proposalReducer from "./slices/proposal";
import walletReducer from "./slices/wallet";
import clickProposalReducer from "./slices/clickProposal";
import clickTokenReducer from "./slices/clickToken";
import providerReducer from "./slices/provider";
import chainProvider from "./slices/chain";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer,
    chain:chainProvider,
    clickProposal: clickProposalReducer,
    clickToken: clickTokenReducer,
    provider: providerReducer,
});

export { rootReducer };
