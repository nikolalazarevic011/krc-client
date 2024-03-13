import React from "react";
import { Navigate } from "react-router-dom";
import { tokenLoader } from "../util/auth";

const ProtectedRoute = ({ element }) => {
    const token = tokenLoader();

    return token ? element : <Navigate to="login" />;
    //! return token ? element : <Navigate to="/login" />;  delete / before login to get relative path
};

export default ProtectedRoute;
