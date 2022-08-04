import { createSlice } from "@reduxjs/toolkit";
import { ProposalState } from "../../@types/proposal";
import { _proposalsActive, _proposalsHistory } from "../../_mock";
//
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState: ProposalState = {
  activeProposals: _proposalsActive,
  historyProposals: _proposalsHistory,
  currentProposal: null,
};

const slice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setCurrentProposal(state, action) {
      state.currentProposal = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setCurrentProposal } = slice.actions;

// ----------------------------------------------------------------------
