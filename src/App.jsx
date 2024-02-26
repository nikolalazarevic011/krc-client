import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BeautifulTheme } from "./theme/BeautifulTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/navigation/Root";
import Home from "./pages/HomePage";
import Handouts from "./pages/Handouts/Handouts";
import Shoes from "./pages/Handouts/Shoes";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: ,
        children: [
            { index: true, element: <Home /> },
            {
                path: "handouts",
                children: [
                    { index: true, element: <Handouts /> },
                    { path: "shoes", element: <Shoes /> },
                ],
            },
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
