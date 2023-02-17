import React, { useContext, useEffect } from 'react'

//Routes
import { BrowserRouter,Routes,Route, Navigate } from "react-router-dom"

import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

//Contexts
import { AuthContext } from '../auth/AuthContext'

//Pages
import { ChatPage } from '../pages/ChatPage'
import { NewsPage } from '../pages/NewsPage'
import { UserPage } from '../pages/UserPage'

//Styles for ANT DESIGN
import "antd/dist/antd.css";

export const AppRouter = () => {

    //Saber estado de autenticacion
    const { auth,verificarToken } = useContext(AuthContext);

    useEffect(() => {
        //Cada que el componente se recargue tiene que verificar esto una unica vez
        verificarToken();
    }, [verificarToken]);

    //Verificar estado de la secion
    if(auth.checking){
        return <h1>Comprobando token...</h1>
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    
                    <Route path="/messages" element={
                        <PrivateRoute isAuthenticated={auth.logged}>
                            <ChatPage/>
                        </PrivateRoute>
                    }>
                    </Route>

                    <Route path="/news" element={
                        <PrivateRoute isAuthenticated={auth.logged}>
                            <NewsPage/>
                        </PrivateRoute>
                    }></Route>

                    <Route path="/users/:userID" element={
                        <PrivateRoute isAuthenticated={auth.logged}>
                            <UserPage/>
                        </PrivateRoute>
                    }></Route>

                    <Route path="/auth/*" element={
                        <PublicRoute isAuthenticated={auth.logged}>
                            <AuthRouter/>
                        </PublicRoute>
                    }></Route>
                    
                    <Route path="/*" element={
                        <Navigate to={"/news"}/>
                    }></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
