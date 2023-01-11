import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext';
import Swal from "sweetalert2";


//Custom Hooks
import useForm from '../hooks/useForm';

export const LoginPage = () => {

	const { login } = useContext(AuthContext);

	const [formValues,handleInputChange,setFormValues] = useForm({
		email:"example@hotmail.com",
		password:"123456",
		rememberMe:true
	});

	useEffect(() => {

		const email = localStorage.getItem("email");

		if(email) setFormValues((form) => ({...form,email,rememberMe:true}));

	}, [setFormValues]);
	

	const toggleCheck = () => {

		setFormValues((form) => ({
			...form,
			rememberMe:!form.rememberMe//[] se refiere a usar el valor del name y que no cree una nueva propiedad en el objeto
		}));

	}

	const onSubmit = async(e) => {

		e.preventDefault();

		formValues.rememberMe ? localStorage.setItem("email",formValues.email) : localStorage.removeItem("email");
	
		const { email,password } = formValues;
		const ok = await login(email,password);

		(!ok) && Swal.fire("Error","Verifique el usuario / contransena","error");

	}

    return (
        <form className="login100-form validate-form flex-sb flex-w" onSubmit={onSubmit}>
			<span className="login100-form-title mb-3">Chat - Ingreso</span>
					
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
				<div className="col" onClick={() => toggleCheck()}>
					<input 
						className="input-checkbox100" 
						id="ckb1" 
						type="checkbox" 
						name="rememberMe" 
						checked={formValues.rememberMe}
						onChange={handleInputChange}
						readOnly
					/>
					<label className="label-checkbox100">Recordarme</label>
			    </div>

				<div className="col text-right">
					<Link to={`/auth/register/`} className="txt1">Nueva cuenta?</Link>
				</div>
			</div>

			<div className="container-login100-form-btn m-t-17">
				<button 
					className="login100-form-btn"
					disabled={(!(formValues.email.length > 0 && formValues.password.length > 0))}
				>
					Ingresar
				</button>
			</div>

		</form>
	
    )
}
