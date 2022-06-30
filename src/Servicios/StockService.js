

import { apiBaseUrl } from "../constants/constants";

import axios from "axios";

const stockService = {
    
    getProductosDisponibles: () => {
        return axios.get(`${apiBaseUrl}/productos/disponibles`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    },
    getProductos: () => {
        return axios.get(`${apiBaseUrl}/productos/`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

    }
}


export { stockService };