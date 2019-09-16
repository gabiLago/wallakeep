import {API, HOST} from "./Util";

export default class SaleService {
   


    getSales({start, limit, sort, includeTotal = true, tag, price, name}) {
        // TODO Empezamos la query
        let query = "?";

        // TODO Añadimos el start
        query += start ? `start=${start}&` : "";

        // TODO 2. Faltan añadir a la query los demás campos

        // TODO Eliminamos el último & de la query
        query = query.substr(0, query.length - 1);

        return fetch(`${HOST}/${API}/anuncios${query}`, {
            method: "GET"
        }).then(res => res.json());
    }

    getTags() {
        return new Promise((resolve) => {
            return resolve({
                    ok: true,
                    allowedTags: ["A", "B"]
                }
            )
        }) // TODO 2. Eliminar estas líneas y realizar la llamada a NodePop para obtener todos los tags
    }
}
