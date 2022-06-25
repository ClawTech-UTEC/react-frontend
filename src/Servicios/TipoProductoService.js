import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

const tipoProductoService = {



    getProductosMasVendidos: (year) => {
        return axios.get(
            `${apiBaseUrl}/tipoProductos/masVendidos/${year}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    },
    getProductosByProvedor: (idProv) => {
        return axios.post(
            `${apiBaseUrl}/tipoProductos/prov/?idProv=${idProv}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    }


}


export default tipoProductoService;