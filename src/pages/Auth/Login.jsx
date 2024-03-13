import React from "react";
import LoginComp from "../../components/login/LoginComp";
import { baseURL, basePath } from "../../App";
import { UIActions } from "../../store/ui";
import { authActions } from "../../store/auth";
import { json, redirect } from "react-router-dom";
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

    // handle the response
    if (
        response.status === 422 ||
        response.status === 401 ||
        response.status === 403
    ) {
        console.log(response);
        console.log(response.statusText);
        console.log(response.url);
        return response.statusText; //react router automatically extract the data for us
    }

    if (!response.ok) {
        throw json(
            { message: "Could not authenticate the user" },
            { status: 500 }
        );
    }

    //! managing the token , backend should return the 'token' key so i can extract it from the response
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem("token", token);
    localStorage.setItem("email", resData.user_email);
    localStorage.setItem("niceName", resData.user_nicename);
    store.dispatch(authActions.setUserEmail(resData.user_email));
    store.dispatch(authActions.setToken(resData.token));
    // store.dispatch(UIActions.toggleDrawer(true));

    return redirect(basePath);
}
