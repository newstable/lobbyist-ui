import { combineReducers } from "redux";
// slices
import proposalReducer from "./slices/proposal";

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  proposal: proposalReducer,
});

export { rootReducer };
