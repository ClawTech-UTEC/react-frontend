import axios from "axios";
import { apiBaseUrl } from "../constants/constants";



const clienteService = {
    getClientes : async () => {
        return axios.get(apiBaseUrl + '/cli');

    }
}


export { clienteService }