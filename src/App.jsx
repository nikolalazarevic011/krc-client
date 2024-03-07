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
import { loader as LogoutLoader } from "./pages/Auth/LogoutPage";
import ProtectedRoute from "./util/ProtectedRoute";
import Classes, { loader as classesLoader } from "./pages/Classes/Classes";
import ClassesDetailPage, {loader as classesDetailLoader} from "./pages/Classes/ClassesDetailPage";

export const baseURL = "https://krc.kingdomrunningclub.org/wp-json";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        loader: tokenLoader,
        // errorElement: ,
        children: [
            { index: true, element: <ProtectedRoute element={<Home />} /> },
            {
                path: "classes",
                loader: classesLoader,
                id: "classesLoader",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute element={<Classes />} />,
                    },
                    {
                        path: ":classId",
                        loader: classesDetailLoader,
                        element: (
                            <ProtectedRoute element={<ClassesDetailPage />} />
                        ),
                    },
                ],
            },
            {
                path: "handouts",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute element={<Handouts />} />,
                    },
                    {
                        path: "shoes",
                        element: <ProtectedRoute element={<Shoes />} />,
                    },
                ],
            },
            {
                path: "login",
                element: <Login />,
                action: LoginAction, // for token
            },
            { path: "logout", loader: LogoutLoader },
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
