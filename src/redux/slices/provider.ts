import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

interface initialStateObject {
    provider: Object;
}

const initialState: initialStateObject = {
    provider: [],
};

const slice = createSlice({
    name: "provider",
    initialState,
    reducers: {
        setProvider(state, action) {
            state.provider = action.payload;
        },
    },
});

// Reducer
export default slice.reducer;

// Actions
export const { setProvider } = slice.actions;

// ----------------------------------------------------------------------
