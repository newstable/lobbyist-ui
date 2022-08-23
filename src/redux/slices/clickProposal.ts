import { createSlice } from "@reduxjs/toolkit";
import { Proposal } from "../../@types/proposal";

interface initialStateProposal {
    clickproposal: Proposal[];
}

const initialState: initialStateProposal = {
    clickproposal: [],
};

const slice = createSlice({
    name: "clickproposal",
    initialState,
    reducers: {
        setClickProposal(state, action) {
            state.clickproposal = action.payload;
        },
    },
});

export default slice.reducer;
export const { setClickProposal } = slice.actions;
