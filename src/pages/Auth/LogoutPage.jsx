import { redirect } from "react-router-dom";
import store from "../../store";
import { authActions } from "../../store/auth";
import { UIActions } from "../../store/ui";
import { basePath } from "../../App";

export function loader() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("krc_member_login");
    localStorage.removeItem("niceName");
    store.dispatch(authActions.setToken(null))
    // store.dispatch(UIActions.toggleDrawer(false))
    return redirect(basePath);
}