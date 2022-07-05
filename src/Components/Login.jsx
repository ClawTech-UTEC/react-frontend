


import { Avatar, Button, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import logo from '../images/logo.png';
import { usuarioService } from '../Servicios/UsuarioService';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Registrarse from './Registrarse';
import { useNavigate } from 'react-router-dom';

const Login = ({setLogged}) => {


    const [error, setError] = useState("");
    const navigate = useNavigate();

    //aqui controlamos si se muestra el formulario dde registro o el de login
    const [mostrarRegistrarse, setMostrarRegistrarse] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });

        const response = usuarioService.login(data.get('email'), data.get('password'), setError);
    };


    const validationSchema = yup.object({
        email: yup
            .string('Email')
            .email('Debes iungresar un email válido')
            .required('Debes ingresar un email'),
        password: yup
            .string('Contraseña')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Debes ingresar una contraseña'),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log({
                email: values.email,
                password: values.password,
            });

            usuarioService.login(values.email, values.password, setError).then(response => {
                if (response.status === 200) {
                    localStorage.setItem('jwt', response.data.jwt);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('idUsuario', response.data.idUsuario);
                    setLogged(true)
                    navigate("/");

                }
            }).catch(error => {
                console.log(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    setError("Email o password incorrectos");
                } else if (error.response.status === 500) {
                    setError("No se pudo conectar con el servidor");
                } else {
                    setError("Error desconocido");
                }
            });


        },
    });


    return (
        <div className='background'>

            {mostrarRegistrarse ? <Registrarse volverLogin={() => setMostrarRegistrarse(false)}/> :

                <Paper>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <div className='centeredDiv'>
                                <img className='imageLogo' src={logo} alt="logo clawtech"></img>
                            </div >
                            <Typography component="h1" variant="h5">
                                Login
                            </Typography>
                            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>


                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />

                                <Button
                                    type="submit"
                                    color='primary'
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Ingresar
                                </Button>


                                <Typography variant="body1" className='errorMessage'>
                                    {error}
                                </Typography>

                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            ¿Olvidaste tu password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2" onClick={()=>setMostrarRegistrarse(true)}>
                                            {"Registrarse"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container></Paper>}
        </div>
    );
}

export default Login;
