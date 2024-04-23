import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import UISlice from "./ui";
import resourceSlice from "./resources";
const store = configureStore({
    reducer: { auth: authSlice, ui: UISlice, resources: resourceSlice },
});

export default store;
