const baseURL = process.env.REACT_APP_API_URL;

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