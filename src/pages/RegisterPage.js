import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

//Contexts
import { AuthContext } from '../auth/AuthContext';

//Custom Hooks
import useForm from '../hooks/useForm'

//Alerts
import Swal from "sweetalert2";

export const RegisterPage = () => {

	const { register } = useContext(AuthContext);

	const [formValues,handleInputChange,setFormValues] = useForm({
		name:"Example name",
		email:"example@hotmail.com",
		password:"123456"
	});

	const onSubmit = async(e) => {

		e.preventDefault();
		
		const { name,email,password } = formValues;
		const ok = await register(name,email,password);


		(ok !== true) && Swal.fire("Error",ok,"error");

	};


    return (
        <form 
			className="login100-form validate-form flex-sb flex-w"
			onSubmit={onSubmit}
		>
			<span className="login100-form-title mb-3">Chat - Registro</span>

			<div className="wrap-input100 validate-input mb-3">
				<input 
					className="input100" 
					type="text" 
					name="name" 
					placeholder="Nombre" 
					value={formValues.name}
					onChange={handleInputChange}
				/>
				<span className="focus-input100"></span>
			</div>

			<div className="wrap-input100 validate-input mb-3">
				<input 
					className="input100" 
					type="email" 
					name="email" 
					placeholder="Email" 
					value={formValues.email}
					onChange={handleInputChange}
				/>
				<span className="focus-input100"></span>
			</div>
					
			<div className="wrap-input100 validate-input mb-3">
				<input 
					className="input100" 
					type="password" 
					name="password" 
					placeholder="Password"
					value={formValues.password}
					onChange={handleInputChange}
				/>
				<span className="focus-input100"></span>
			</div>
					
			<div className="row mb-3">
				<div className="col text-right">
					<Link to={`/auth/login`} className="txt1">Ya tienes cuenta?</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button disabled={(!(formValues.name.length > 0 && formValues.email.length > 0 && formValues.password.length > 0))} className="login100-form-btn" type="submit">Crear cuenta</button>
			</div>
		</form>
    )
}
