import React, { useContext } from 'react'

//Icon's
import { ArrowLeftSquareFill, ChatFill, PersonBoundingBox, PersonFill } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

import { Avatar } from "antd";

//Context's
import { AuthContext } from '../../auth/AuthContext';

const MenuOptions = () => {
    const { auth ,logout } = useContext(AuthContext);

    return (
        <div className="menuOptions">
            <div className="desktopMenu">
                <h1 className="titulo text-dark">MyTime</h1>
                <Link to={`/users/${auth.uid}`}><p className="descripcion"><PersonFill/> Perfil</p></Link>
                <Link to={`/messages`}><p className="descripcion"><ChatFill/> Mensajes</p></Link>
                <p className="descripcion"><PersonBoundingBox/> Buscar usuario</p>
                <p className="descripcion" onClick={logout}><ArrowLeftSquareFill/> Cerrar sesion</p>
            </div>

            <div className="mobileMenu">
                <Link to={`/users/${auth.uid}`}><p className="descripcion"><PersonFill/></p></Link>
                <Link to={`/messages`}><p className="descripcion"><ChatFill/></p></Link>
                <p className="descripcion"><PersonBoundingBox/></p>
                <p className="descripcion" onClick={logout}><ArrowLeftSquareFill/></p>
            </div>

            <div className="userInfo">
                <Avatar size={40} src={`${process.env.REACT_APP_BACKEND_API_URL}/api/usuarios/${auth.uid}/fotos/?tipo=perfil`} />
                <div>
                    <h1 className="titulo-descripcion">{auth.name}</h1>
                    <span className="nota">@{auth.uid}</span>
                </div>
           </div>
        </div>
    )
}

export default MenuOptions;