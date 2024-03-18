import { createSlice } from "@reduxjs/toolkit";

const initialUISlice = { toggleDrawer: false, isLoading: false };

const UISlice = createSlice({
    name: "ui",
    initialState: initialUISlice,
    reducers: {
        toggleDrawer(state, action) {
            state.toggleDrawer = action.payload;
        },
        isLoading(state, action) {
            state.isLoading = action.payload
        }
    },
});

export const UIActions = UISlice.actions; // to be imported to the component you need it
export default UISlice.reducer;
