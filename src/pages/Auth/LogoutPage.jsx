import { redirect } from "react-router-dom";
import store from "../../store";
import { authActions } from "../../store/auth";
import { UIActions } from "../../store/ui";

export function loader() {
    store.dispatch(UIActions.toggleDrawer(false))
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("niceName");
    store.dispatch(authActions.setToken(null))
    return redirect("/");
}