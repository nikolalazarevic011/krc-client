import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BeautifulTheme } from "./theme/BeautifulTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/navigation/Root";
import Home from "./pages/HomePage";
import Handouts from "./pages/Handouts/Handouts";
import Shoes from "./pages/Handouts/Shoes";
import Login, { action as LoginAction } from "./pages/Auth/Login";
import { tokenLoader } from "./util/auth";
import {loader as LogoutLoader} from "./pages/Auth/LogoutPage"
import ProtectedRoute from "./util/ProtectedRoute"

export const baseURL = "https://krc.kingdomrunningclub.org/wp-json";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: tokenLoader,
        // errorElement: ,
        children: [
            { index: true, element: < ProtectedRoute element={ <Home/>}/> },
            {
                path: "handouts",
                children: [
                    { index: true, element: < ProtectedRoute element={ <Handouts/>}/>  },
                    { path: "shoes", element: < ProtectedRoute element={ <Shoes/>}/>  },
                ],
            },
            {
                path: "login",
                element: <Login />,
                action: LoginAction, // for token
            },
            { path: "logout", loader: LogoutLoader  },

        ],
    },
]);

function App() {
    return (
        <>
            <ThemeProvider theme={BeautifulTheme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;
