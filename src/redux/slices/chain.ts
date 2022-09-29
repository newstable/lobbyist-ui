import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------
const initialState = {
    id: 137,
};

const slice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setChainName(state, action) {
            state.id = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const { setChainName } = slice.actions;

// ----------------------------------------------------------------------
