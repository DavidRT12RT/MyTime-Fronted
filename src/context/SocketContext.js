import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'

//Contexts
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from './chat/ChatContext';

import { types } from '../types/types';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {

    const { socket, online,conectarSocket,desconectarSocket } = useSocket('http://localhost:8080');
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    //Estar al pendiente al estado de auth para hacer connect o disconnect
    useEffect(() => {

        if(auth.logged) conectarSocket();

    },[auth,conectarSocket]);

    useEffect(() => {

        if(!auth.logged) desconectarSocket();

    },[auth,desconectarSocket]);


    //Escuchar cambios de usuarios conectados
    useEffect(() => {

        //Solo ejecuta esto si el socket tiene valor
        socket?.on("lista-usuarios",(usuarios) => {
            dispatch({
                type:types.usuariosCargados,
                payload:usuarios
            });
        });

    }, [socket,dispatch]);

    //Escuchar mensajes personales
    useEffect(() => {

        socket?.on("mensaje-personal",(mensaje) => {
            //Dispatch de una accion que
            dispatch({
                type:types.nuevoMensaje,
                payload:mensaje
            });
            //TODO:Mover el scroll al final
            scrollToBottomAnimated("mensajes");
        });

    }, [socket,dispatch]);
    
    
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}