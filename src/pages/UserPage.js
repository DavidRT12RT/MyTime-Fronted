//Components
import UsuarioHeader from '../components/UserPage/UsuarioHeader';
import UsuarioInfo from '../components/UserPage/UsuarioInfo';
import UsuarioNewPublication from '../components/UserPage/UsuarioNewPublication';

//Estilos CSS
import "../css/User.css";

//Extra components
import Footer from "../components/Footer";

//Custom hook for logic
import { useUsuario } from '../hooks/useUsuario';


export const UserPage = () => {

    //Custom hook para el manejo del componente
    const { userInfo,isEditing,setIsEditing, values, handleInputChange, handleEditInfoUser,setFilesList ,auth } = useUsuario();

    if(userInfo === null) return <h1>Cargando informacion del usuario...</h1>
    else return (
        <>
            <div className="contenedorPrincipalUsuario">
               <UsuarioHeader 
                    userInfo={userInfo} 
                    isEditing={isEditing} 
                    setIsEditing={setIsEditing} 
                    values={values} 
                    handleInputChange={handleInputChange} 
                    handleEditInfoUser={handleEditInfoUser} 
                    setFilesList={setFilesList}
                    auth={auth}
                />
                <section className="contenedorSecundarioUsuario">
                    <UsuarioInfo 
                        userInfo={userInfo} 
                        isEditing={isEditing} 
                        values={values} 
                        handleInputChange={handleInputChange}
                    />
                    <div className="userPublicacionesContainer">
                        {
                            userInfo.uid === auth.uid && <UsuarioNewPublication userInfo={userInfo}/> 
                        }
                    </div>
                </section>
            </div>
            <Footer/>
        </>
    )
}
