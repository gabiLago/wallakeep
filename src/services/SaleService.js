import {API, HOST, ADS_PATH, apiToken} from "./Util";

export default class SaleService {
   


    getSales({start, limit, sort, includeTotal = true, tag, price, name}) {
    
        //? Empezamos la query
        let query = "?";

        //? API token needed on query string
        query += `jwttoken=${apiToken()}`;
                
        //! 2. Faltan añadir a la query los demás campos
        //? Query for "nombre"
        query += name ? `&nombre=${name}` : "";

        //? Query for "precio"
        query += price ? `&precio=${price}-` : "";

        //? Query for "tags"
        query += tag !== undefined ? `&tag=${tag}` : "";

        return fetch(`${HOST}/${API}/${ADS_PATH}${query}`, {
            method: "GET"
        }).then(res => res.json()); 
    }

    getTags() {
        let token = apiToken();
        
        return fetch(`${HOST}/${API}/${ADS_PATH}/tags?jwttoken=${token}`, {
            method: "GET"
        }).then(res => res.json());
        
        //! 2. Eliminar estas líneas y realizar la llamada a NodePop para obtener todos los tags
    }
}
