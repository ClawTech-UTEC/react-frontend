import axios from "axios";
import { apiBaseUrl } from "../constants/constants";






const usuarioService = {


    login: (email, password, errorFunction) => {
        // var bodyFormData = new FormData();
        // bodyFormData.append('email', email);
        // bodyFormData.append('password', email);
        var loginRequest = new Object();

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
    }

}



export { usuarioService };