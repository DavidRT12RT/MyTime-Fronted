import { createContext, useCallback, useContext, useState } from "react";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

//Contexts
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
    uid:null,
    checking:true,
    logged:false,
    name:null,
    email:null
};

export const AuthProvider = ({children}) => {
    
    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    const login = async(email,password) => {

        const resp = await fetchSinToken(`/auth/login/`,{email,password},"POST");
        const body = await resp.json();
    
        if(resp.status != 200) return false;
        //PETICION HECHA CON EXITO
        localStorage.setItem("token",body.token);
        setAuth({
            uid:body.usuario.uid,
            checking:false,
            logged:true,
            name:body.usuario.nombre,
            email:body.usuario.email
        });
        return true;
    }

    const register = async(nombre,email,password) => {

        const resp = await fetchSinToken(`/usuarios/`,{nombre,email,password},"POST");
        const body = await resp.json();

        if(resp.status != 201) return body.msg;

         //PETICION HECHA CON EXITO
        localStorage.setItem("token",body.token);
        setAuth({
            uid:body.usuario.uid,
            checking:false,
            logged:true,
            name:body.usuario.nombre,
            email:body.usuario.email
        });
        return true;       

    }

    const verificarToken = useCallback(async() => {

        const token = localStorage.getItem("token");

        //TOKEN NO EXISTE
        if(!token) {
            setAuth({
                ...initialState,
                checking:false
            });
            return false;
        }

        //TOKEN ES VALIDO AUN ?
        const resp = await fetchConToken(`/auth/renew`);
        const body = await resp.json();

        if(resp.status != 200){
            setAuth({
                ...initialState,
                checking:false
            });
            return false
        };

        //PETICION HECHA CON EXITO
        localStorage.setItem("token",body.token);
        setAuth({
            uid:body.usuario.uid,
            checking:false,
            logged:true,
            name:body.usuario.nombre,
            email:body.usuario.email
        });
        return true;

    },[]);


    const logout = () => {

        localStorage.removeItem("token");

        //Actualizar auth state
        setAuth({
            ...initialState,
            checking:false
        });

        //Actualizar chat context
        dispatch({
            type:types.borrarMensajes,
        });

    }


    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificarToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

