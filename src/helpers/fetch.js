const baseURL = `${process.env.REACT_APP_BACKEND_API_URL}/api`;

export const fetchSinToken = async(endpoint,data,method="GET") => {

    const url = `${baseURL}${endpoint}`;
    if(method === "GET"){
        return fetch(url);
    }else{
        return fetch(url,{
            //OBJETO DE CONFIGURACION
            method,
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(data)
        })
    }
}

export const fetchConToken = async(endpoint,data,method="GET") => {


    const url = `${baseURL}${endpoint}`;
    const token = localStorage.getItem("token") || "";

    if(method === "GET"){
        return fetch(url,{
            headers:{
                "x-token":token
            }
        });
    }else{
        return fetch(url,{
            //OBJETO DE CONFIGURACION
            method,
            headers:{"Content-type":"application/json","x-token":token},
            body:JSON.stringify(data)
        })
    }
}

export const fetchConTokenSinJSON = (endpoint,data,method = "POST") =>{
    const url = `${baseURL}${endpoint}`;
    const token = localStorage.getItem('token') || "";


    switch (method) {
        case "POST":
        case "PUT":
            return fetch(url,{
                method,
                headers:{
                    'x-token':token
                },
                body:data
            });
        
        default:
            break;
    }
}