import React from 'react'

import { Avatar } from 'antd'
import moment from "moment";

//Icon's
import { ArrowLeft } from 'react-bootstrap-icons';

//Context's
import { types } from '../types/types';


export const MessageChatUserInfo = ({user,dispatch}) => {

    const handleClick = () => {
        dispatch({
            type:types.desactivarChat
        });
    }

    return (
        <div>
            <div className="MessageChatUserInfo">
                <span className="MessageTopBarLeftIcon" onClick={handleClick}><ArrowLeft/></span>
                {/*<Avatar size={64} src={`${process.env.REACT_APP_BACKEND_URL}/api/usuarios/${user.uid}/fotos/?tipo=perfil`} /> */}
                <Avatar size={64} src={`https://xsgames.co/randomusers/avatar.php?g=male`}/>
                <div className="content">
                    <h1 className="titulo-descripcion">{user.nombre}</h1>
                    <p className="descripcion">{(user.descripcion) ? user.descripcion : "Usuario sin descripcion..."}</p>
                    <div className="ExtraInfo">
                        <p className="descripcion">{moment(user.fechaRegistro).format("LLLL")}</p>
                    </div>
                </div>
           </div>
            <hr style={{margin:"0px"}}/>
        </div>
    )
}
