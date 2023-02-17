import React from 'react'


import { Routes,Route } from "react-router-dom"

import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'

//Estilos CSS
import "../css/Auth.css";

export const AuthRouter = () => {
    document.body.className = "";
    document.body.classList.add("bg-auths-router");

    return (
	    <div className="limiter">
		    <div className="container-login100">
			    <div className="wrap-login100 p-t-50 p-b-90">
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/*" element={<LoginPage/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
