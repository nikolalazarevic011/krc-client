import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuth: null, userEmail: null, token: null};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        setUserEmail(state, action) {
            state.userEmail = action.payload;
            // console.log(action);
        },
        setToken(state, action) {
            state.token = action.payload;
            // console.log(action);
        },
        //! changed by api calls
        // logIn(state) {
        //     state.isAuth = true;
        // },
        // logOut(state) {
        //     state.isAuth = false;
        // },
    },
});

export const authActions = authSlice.actions; // to be imported to the component you need it
export default authSlice.reducer;
