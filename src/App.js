import { CssBaseline, ThemeProvider } from "@mui/material";
import { BeautifulTheme } from "./theme/BeautifulTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/navigation/Root";
import Home from "./pages/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // errorElement: ,
        children: [{ index: true, element: <Home /> }],
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
