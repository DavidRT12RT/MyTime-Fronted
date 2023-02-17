import React from 'react'
import { ArrowBarUp } from 'react-bootstrap-icons'

const MessagesInbox = () => {
    return (
        <div className="messagesInbox">
            <ArrowBarUp className="titulo-descripcion"/>
            <p className="titulo-descripcion">Mensajes</p>
        </div>
    )
}

export default MessagesInbox;