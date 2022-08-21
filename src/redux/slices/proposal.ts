import { createSlice } from "@reduxjs/toolkit";
import { ProposalState } from "../../@types/proposal";
//
// import { dispatch } from "../store";

// ----------------------------------------------------------------------

const initialState: ProposalState = {
    activeProposals: [],
    historyProposals: [],
    currentProposal: [],
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
