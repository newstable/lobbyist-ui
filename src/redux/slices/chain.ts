import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

interface initialStateObject {
    name: string;
}

const initialState: initialStateObject = {
    name: "Polygon",
};

const slice = createSlice({
    name: "chain",
    initialState,
    reducers: {
        setChainName(state, action) {
            state.address = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const { setChainName } = slice.actions;

// ----------------------------------------------------------------------
