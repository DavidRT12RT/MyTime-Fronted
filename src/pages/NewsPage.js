
//Estilos CSS
import "../css/News.css";

//Component's
import MenuOptions from "../components/NewsPage/MenuOptions";
import UsuarioNewPublication from "../components/NewsPage/UsuarioNewPublication";
import Publicacion from "../components/NewsPage/Publicacion";
import MessagesInbox from "../components/NewsPage/MessagesInbox";

//Custom hook for logic of component
import { useNoticias } from "../hooks/useNoticias";

export const NewsPage = () => {

    const { userInfo,publicaciones } = useNoticias();

    return (
        <div className="containerPrincipalNoticias">
            <MenuOptions/>
            <div className="publicacionesContainer">
                <UsuarioNewPublication userInfo={userInfo}/>
                {
                    publicaciones.map(publicacion => (
                        <Publicacion publicacion={publicacion} key={publicacion._id}/>
                    ))
                }
            </div>
            <MessagesInbox/>
        </div>
    )

};
