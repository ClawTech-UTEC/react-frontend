import axios from "axios";
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
        axios.post(
            apiBaseUrl + "/login", loginRequest, {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        ).then(response => {
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.jwt);
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('idUsuario', response.data.idUsuario);
                window.location.replace("http://localhost:3000/");

            }
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                errorFunction("Email o password incorrectos");
            } else if (error.response.status === 500) {
                errorFunction("No se pudo conectar con el servidor");
            } else {
                errorFunction("Error desconocido");
            }
        });
    },



    registrarse: (email, password, nombre, apellido, errorFunction, volverAlLogin) => {
        console.log(email, password, nombre, apellido);
        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('nombre', nombre);
        formData.append('apellido', apellido);
        axios.post(
            apiBaseUrl + "/register", formData, {

            'Content-Type': 'multipart/form-data'


        }
        ).then(response => {
            if (response.status === 200) {

                window.location.replace("http://localhost:3000/");
                volverAlLogin();
            }
        }).catch(error => {
            console.log(error);
            if (error.response.status === 400) {
                errorFunction("Email ya existe");
            } else if (error.response.status === 500) {
                errorFunction("No se pudo conectar con el servidor");
            } else {
                errorFunction("Error desconocido");
            }
        });
    },

    getUsuario: () => {
        return axios.post(
            apiBaseUrl + "/usuarios", {
            'Content-Type': 'multipart/form-data'
        }
        ).then(response => {

        })
    }

}



export { usuarioService };