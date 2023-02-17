
import React from 'react'
import { Navigate } from 'react-router-dom'

import "../css/PrivateRoutes.css";

export const PrivateRoute = ({isAuthenticated,children}) => {
    document.body.className = "";
    document.body.classList.add("bg-private-routes");

    return isAuthenticated ? children : <Navigate to="/auth/login"/>;
}

