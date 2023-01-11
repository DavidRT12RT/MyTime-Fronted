import { useState } from "react";

const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState);

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]:target.value
        });
    }

    return [formValues,handleInputChange,setFormValues];
};


export default useForm;