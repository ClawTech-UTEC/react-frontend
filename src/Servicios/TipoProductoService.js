import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

const tipoProductoService = {



    getReporteRecepcionesAnual: (year) => {
        return axios.get(
            `${apiBaseUrl}/tipoProductos/masVendidos/${year}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    }
}


export default tipoProductoService;