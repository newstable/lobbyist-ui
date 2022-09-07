import { createSlice } from "@reduxjs/toolkit";
import { ActiveProposal } from "../../@types/proposal";

interface initialStateProposal {
    activeProposal: ActiveProposal[];
}

const initialState: initialStateProposal = {
    activeProposal: [],
};

const slice = createSlice({
    name: "activeProposal",
    initialState,
    reducers: {
        setActiveProposal(state, action) {
            state.activeProposal = action.payload;
        },
    },
});

export default slice.reducer;
export const { setActiveProposal } = slice.actions;
