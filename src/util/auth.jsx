import { redirect, useLocation } from "react-router-dom";

export function getAuthToken() {
    //old way
    // const token = localStorage.getItem("token");

    //new
    const token = localStorage.getItem("token")
    const isLoggedIn = localStorage.getItem("krc_member_login");

    if (!token && !isLoggedIn) {
        return null;
    }

    return true;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}
