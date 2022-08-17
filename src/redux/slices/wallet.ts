import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

interface initialStateObject {
    address: string;
}

const initialState: initialStateObject = {
    address: "",
};

const slice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setWalletAddress(state, action) {
            state.address = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const { setWalletAddress } = slice.actions;

// ----------------------------------------------------------------------
