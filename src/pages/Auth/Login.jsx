import React from "react";
import LoginComp from "../../components/login/LoginComp";
import { baseURL, basePath } from "../../App";
import { authActions } from "../../store/auth";
import { redirect } from "react-router-dom";
import store from "../../store";

const Login = () => {
    return (
        <>
            <LoginComp />
        </>
    );
};
export default Login;

export async function action({ request }) {
    const data = await request.formData();
    const authData = {
        username: data.get("username").trim(),
        password: data.get("password").trim(),
    };

    const response = await fetch(`${baseURL}/jwt-auth/v1/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    });

    // Handle the response for specific error statuses
    if (
        response.status === 422 ||
        response.status === 401 ||
        response.status === 403
    ) {
        const customMessage = "Invalid credentials";
        return customMessage; // React Router automatically extract the data for us in the component we use error from router!
    }

    if (!response.ok) {
        return response.statusText;
    }

    const resData = await response.json();

    // Check for user roles
    const userRoles = resData.profile.user_role;
    const isAdminOrMember =
        userRoles.includes("administrator") ||
        userRoles.includes("um_krc-member");

    if (!isAdminOrMember) {
        const customMessage = "You need to be a KRC member or Admin to proceed";
        return customMessage;
    }

    // User is either an admin or a krc-member, proceed to set localStorage and dispatch actions
    localStorage.setItem("token", resData.token);
    localStorage.setItem("email", resData.profile.user_email);
    localStorage.setItem("niceName", resData.profile.user_nicename);
    // Assuming store and authActions are available in the scope
    store.dispatch(authActions.setUserEmail(resData.profile.user_email));
    store.dispatch(authActions.setToken(resData.token));
    // store.dispatch(UIActions.toggleDrawer(true));

    // Redirect the user to the basePath
    return redirect(basePath);
}
