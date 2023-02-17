import React from 'react'

const UsuarioInfo = ({userInfo,isEditing,values,handleInputChange}) => {
    return (
        <div className="userInfoContainer">
            <h1 className="titulo">Informacion</h1>
            <div className="row">
                <h1 className="titulo-descripcion col-3">Correo:</h1>
                {/* {isEditing ? <input name="correo" value={values.correo} onChange={handleInputChange} className="form-control descripcion"></input> : <h1 className="titulo-descripcion col-9">{userInfo.email}</h1>} */}
                <h1 className="titulo-descripcion col-9">{userInfo.email}</h1>
                {/* <h1 className="titulo-descripcion col-3 mt-3">Telefono:</h1> */}
            </div>

        </div>
    )
}

export default UsuarioInfo