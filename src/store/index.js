import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import UISlice from "./ui";
const store = configureStore({
    reducer: { auth: authSlice, ui: UISlice },
});

export default store;
