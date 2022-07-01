






import { apiBaseUrl } from "../constants/constants";

import axios from "axios";

const distribuidorService = {

    getDistribuidores: () => {
        return axios.get(`${apiBaseUrl}/dist/`, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        });
    },
    
}


export { distribuidorService };