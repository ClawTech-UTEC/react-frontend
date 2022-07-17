import axios from "axios";
import { apiBaseUrl } from "../constants/constants";



const categoriaService = {
    getCategorias: async () => {
        return axios.get(apiBaseUrl + '/categoria');

    },

    getReporteVentasCategorias: async (idcat, year) => {
        return axios.get(apiBaseUrl + `/categoria/reporte/ventas/${idcat}/${year}`);

    },

    getReporteComprasCategorias: async (idcat, year) => {
        return axios.get(apiBaseUrl + `/categoria/reporte/compras/${idcat}/${year}`);

    }
}


export { categoriaService }