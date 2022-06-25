

import axios from 'axios';
import { apiBaseUrl } from '../constants/constants';

const authService = {


    login: (idPedido, idUsuaurio) => {
        return axios.put(`${apiBaseUrl}/pedidos/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }

        );
    },
}