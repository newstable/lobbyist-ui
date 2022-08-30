import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

interface initialStateObject {
    address: string;
}

const initialState: initialStateObject = {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
};

const slice = createSlice({
    name: "clickToken",
    initialState,
    reducers: {
        setClickAddress(state, action) {
            state.address = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const { setClickAddress } = slice.actions;

// ----------------------------------------------------------------------
