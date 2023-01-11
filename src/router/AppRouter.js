import React, { useContext, useEffect } from 'react'

//Routes
import { BrowserRouter,Routes,Route } from "react-router-dom"

import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

//Contexts
import { AuthContext } from '../auth/AuthContext'

//Pages
import { ChatPage } from '../pages/ChatPage'

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
                    <Route path="/" element={
                        <PrivateRoute isAuthenticated={auth.logged}>
                            <ChatPage/>
                        </PrivateRoute>
                    }>
                    </Route>

                    <Route path="/auth/*" element={
                        <PublicRoute isAuthenticated={auth.logged}>
                            <AuthRouter/>
                        </PublicRoute>
                    }></Route>
                    
                    <Route path="/*" element={<ChatPage/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
