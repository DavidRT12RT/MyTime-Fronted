import React, { useContext, useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

//Context's
import { AuthContext } from '../../auth/AuthContext';

//Component's
import { InboxPeopleItem } from './InboxPeopleItem'
import { SelectChatPhone } from './SelectChatPhone';

export const InboxPeople = ({usuarios,chatState}) => {

    const { auth,logout } = useContext(AuthContext);

    //UseState para poder filtrar si el usuario usa el buscador
    const [InboxPeople, setInboxPeople] = useState([]);

    useEffect(() => {
        setInboxPeople(usuarios);
    }, [usuarios]);

    const handleFilterUsers = (e) => {

        if(e.target.value.length === 0) return setInboxPeople(usuarios)

        const search = e.target.value.toLowerCase();

        const newInboxPeople = InboxPeople.filter(user => user.nombre.toLowerCase().includes(search));

        setInboxPeople(newInboxPeople);
    }


    return (
        <div 
            className={"InboxPeople " + (chatState.chatActivo === null ? "enabled" : "disabled")} 
        >
            <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="titulo text-dark">Usuarios</h1>
                    <Link to={`/news`}><button type="primary" className="btn btn-primary"><ArrowLeft/> Volver</button></Link>
                </div>
                <input 
                    onChange={handleFilterUsers} 
                    className="form-control" 
                    placeholder="Busca un usuario"
                >
                </input>
            </div>
            <div className="InboxPeopleUsersContainer">
                {
                    InboxPeople.length === 0 
                        ? <h1 className="titulo-descripcion text-danger">Ningun usuario encontrado...</h1>
                        : InboxPeople.map(usuario => {
                            if(usuario.uid !== auth.uid) return <InboxPeopleItem usuario={usuario} key={usuario.uid}/>
                        ;})
                }
            </div>
            <hr/>
            <SelectChatPhone/>
        </div>
    )
}

