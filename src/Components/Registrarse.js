


import { Avatar, Button, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, Typography, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import logo from '../images/logo.png';
import { usuarioService } from '../Servicios/UsuarioService';
import * as yup from 'yup';
import { useFormik } from 'formik';

const Registrarse = (props) => {
    const [error, setError] = useState("");
    
    const validationSchema = yup.object({
        email: yup
            .string('Email').trim()
            .email('Debes iungresar un email válido')
            .required('Debes ingresar un email'),
        password: yup
            .string('Contraseña')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Debes ingresar una contraseña'),
        repitePassword: yup
            .string('Repite la Contraseña')
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Debes ingresar una contraseña')
            .oneOf([yup.ref("password")], "Los passwords no coinciden")

    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repitePasswotd: '',
            nombre: '',
            apellido: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log({
                email: values.email,
                password: values.password,
                nombre: values.nombre,
                apellido: values.apellido,
                
            });
            usuarioService.registrarse(values.email, values.password, values.nombre, values.apellido, setError, ).then(response => {
                if (response.status === 200) {

                    // window.location.replace(apiBaseUrl + "/");
                    props.volverLogin();
                }
                
            }).catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    setError("Email ya existe");
                } else if (error.response.status === 500) {
                    setError("No se pudo conectar con el servidor");
                } else {
                    setError("Error desconocido");
                }
                console.log(error)
            });
        },
    });
    return (
        
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
                    <h2 className='loginTitle'  >
                            Registrarse
                        </h2>
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
                            <TextField
                                fullWidth
                            id="repitePassword"
                            name="repitePassword"
                                label="Repite tu Password"
                                type="password"
                            value={formik.values.repitePassword}
                                onChange={formik.handleChange}
                            error={formik.touched.repitePassword && Boolean(formik.errors.repitePassword)}
                            helperText={formik.touched.repitePassword && formik.errors.repitePassword}
                            />
                            <TextField
                                fullWidth
                                id="nombre"
                                name="nombre"
                                label="Nombre"
                                type="text"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre && formik.errors.nombre}
                            />
                            <TextField
                                fullWidth
                                id="apellido"
                                name="apellido"
                                label="Apellido"
                                type="text"
                                value={formik.values.apellido}
                                onChange={formik.handleChange}
                                error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                                helperText={formik.touched.apellido && formik.errors.apellido}
                            />
                            <Button
                                type="submit"
                                color='primary'
                                
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarse
                            </Button>


                            <Typography variant="body1" className='errorMessage'>
                                {error}
                            </Typography>

                            <Grid container>
                                
                                <Grid item>
                                <Link href="#" variant="body2" onClick={props.volverLogin}>
                                        {"Volver al login"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container></Paper>
      
    );
}

export default Registrarse;
