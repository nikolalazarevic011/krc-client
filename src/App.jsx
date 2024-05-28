import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BeautifulTheme } from "./theme/BeautifulTheme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/navigation/Root";
import Home, { loader as homePageLoader } from "./pages/HomePage";
import Handouts, { loader as handoutsLoader } from "./pages/Handouts/Handouts";
import Login, { action as LoginAction } from "./pages/Auth/Login";
import { tokenLoader } from "./util/auth";
import { loader as LogoutLoader } from "./pages/Auth/LogoutPage";
import ProtectedRoute from "./util/ProtectedRoute";
import Classes, { loader as classesLoader } from "./pages/Classes/Classes";
import ClassesDetailPage, {
    loader as classesDetailLoader,
} from "./pages/Classes/ClassesDetailPage";
import HandoutsDetail, {
    loader as handoutsDetailLoader,
} from "./pages/Handouts/HandoutsDetail";
import Homework, { loader as homeworkLoader } from "./pages/Homework/Homework";
import HomeworkDetail, {
    loader as homeworkDetailLoader,
} from "./pages/Homework/HomeworkDetail";
import ErrorPage from "./pages/ErrorPage";
import Exercises, {
    loader as exercisesLoader,
} from "./pages/Exercises/Exercises";
import ExerciseDetail, {
    loader as exerciseDetailLoader,
} from "./pages/Exercises/ExerciseDetail";
import Resources, {
    loader as resourcesLoader,
} from "./pages/Resources/Resources";

export const baseURL = process.env.REACT_APP_API_URL;
export const basePath = process.env.REACT_APP_DEFAULT_PATH;

const router = createBrowserRouter([
    {
        path: basePath,
        element: <Root />,
        loader: tokenLoader,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                loader: homePageLoader,
                element: <ProtectedRoute element={<Home />} />,
            },
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
                loader: handoutsLoader,
                id: "handoutsLoader",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute element={<Handouts />} />,
                    },
                    {
                        path: ":handoutId",
                        loader: handoutsDetailLoader,
                        element: (
                            <ProtectedRoute element={<HandoutsDetail />} />
                        ),
                    },
                ],
            },
            {
                path: "homework",
                loader: homeworkLoader,
                id: "homeworkLoader",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute element={<Homework />} />,
                    },
                    {
                        path: ":homeworkId",
                        loader: homeworkDetailLoader,
                        element: (
                            <ProtectedRoute element={<HomeworkDetail />} />
                        ),
                    },
                ],
            },
            {
                path: "exercises",
                loader: exercisesLoader,
                id: "exercisesLoader",
                children: [
                    {
                        index: true,
                        element: <ProtectedRoute element={<Exercises />} />,
                    },
                    {
                        path: ":exerciseId",
                        loader: exerciseDetailLoader,
                        element: (
                            <ProtectedRoute element={<ExerciseDetail />} />
                        ),
                    },
                ],
            },
            {
                path: "resources/*",
                loader: resourcesLoader,
                id: "resourcesLoader",
                children: [
                    {
                        path: ":resourceId",
                        element: <ProtectedRoute element={<Resources />} />,
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
