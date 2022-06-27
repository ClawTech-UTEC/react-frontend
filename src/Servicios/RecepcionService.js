import axios from "axios";
import { apiBaseUrl } from "../constants/constants";

const recepcionService = {



    getReporteRecepcionesAnual: (year) => {
        return axios.get(
            `${apiBaseUrl}/recepcion/reporte/${year}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    },

    createRec: (recepcion, usuario) => {
        return axios.post(
            `${apiBaseUrl}/recepcion/}`,


            {

                data: {
                    recepcion: recepcion, usuario: usuario
                },

                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    },



    getRecepciones: () => {
        return axios.get(
            `${apiBaseUrl}/recepcion/`,


            {



                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);


    },


    crearRecepcion: (recepcion) => {
        return axios.post(
            `${apiBaseUrl}/recepcion/`,

            recepcion,
            {

                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response);
    }
}


export default recepcionService;