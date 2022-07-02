import axios from "axios";
import { apiBaseUrl } from "../constants/constants";



const depositoService = {
    getDeposito:  () => {
        return axios.get(apiBaseUrl + '/deposito/1');

    },
    updateDeposito:  ({deposito}) => {
        return axios.put(apiBaseUrl + '/deposito', deposito, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });

    }
}


export { depositoService }