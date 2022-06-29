

import { apiBaseUrl } from "../constants/constants";

import axios from "axios";

const stockService = {
    
    getProductosDisponibles: () => {
        axios.get(`${apiBaseUrl}/productos/disponibles`).then(response => { });
    }
}


export { stockService };