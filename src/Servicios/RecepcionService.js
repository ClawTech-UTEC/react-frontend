import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

const recepcionService = {



    getReporteRecepcionesAnual: (year) => {
       return  axios.get(
            `${apiBaseUrl}/recepcion/reporte/${year}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    }
}


export default recepcionService;