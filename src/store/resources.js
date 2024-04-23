import { createSlice } from "@reduxjs/toolkit";

const initialResourcesState = {data: null}

const resourceSlice = createSlice({
    name:'resource',
    initialState: initialResourcesState,
    reducers: {
        setResourceState(state, action) {
            state.data = action.payload
        }
    }
})

export const resourceActions = resourceSlice.actions
export default resourceSlice.reducer