import { redirect, useLocation } from "react-router-dom";

export function getAuthToken() {
    //old way
    // const token = localStorage.getItem("token");

    //new, still named token tho...
    const token = localStorage.getItem("krc_member_login");

    if (!token) {
        return null;
    }

    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}
