import React, { useContext } from 'react'

//Context's
import { ChatContext } from '../context/chat/ChatContext';

//Style
import "../css/Chat.css";

//Component's
import { InboxPeople } from '../components/InboxPeople';
import { SelectChat } from '../components/SelectChat';
import { MessagesChat } from '../components/MessagesChat';

export const ChatPage = () => {
    
    const { chatState,dispatch } = useContext(ChatContext);

    return (
        <div className="messagesContainer">
            <InboxPeople chatState={chatState} usuarios={chatState.usuarios}/>
            {
                (chatState.chatActivo === null) 
                    ? <SelectChat/>
                    : <MessagesChat chatState={chatState} dispatch={dispatch}/>
            }

        </div>
    )
}


