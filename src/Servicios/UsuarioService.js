import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../constants/constants";


/**
 * @author ClawTech 
 * @version 1.0
 * @description Servicio para el manejo de los usuarios
 */




const usuarioService = {


    /**
    @param {string} email 
    @param {string} password
    @param {function} setError accion a realizar en case de un error
    @returns {Promise} retorna una promesa con el resultado de la peticion
    @description Metodo para hacer el login de un usuario

    */
    login: (email, password, errorFunction) => {
        var loginRequest = {};
        loginRequest.email = email;
        loginRequest.password = password;
       return axios.post(
            apiBaseUrl + "/login", loginRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        )
    },



    registrarse: (email, password, nombre, apellido, errorFunction, volverAlLogin) => {
        console.log(email, password, nombre, apellido);
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        return axios.post(
            apiBaseUrl + "/register", formData, {

            'Content-Type': 'multipart/form-data'


        }
        )
    },

    getUsuarios: () => {
        return axios.get(
            apiBaseUrl + "/usuario", {
            'Content-Type': 'multipart/form-data'
        }
        ).then(response => {

        })
    }

}



export { usuarioService };