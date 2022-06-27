import { FormControl, FormHelperText, Grid, Input, InputLabel, Paper, Select, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@material-ui/core'
import { Autocomplete } from '@mui/material';
import React, { PureComponent } from 'react'

import { useEffect, useState } from 'react';
import ProvService from '../Servicios/ProvService';
import tipoProductoService from '../Servicios/TipoProductoService';
import { useFormik } from 'formik';

import * as yup from 'yup';
import recepcionService from '../Servicios/RecepcionService';
import ConfirmationDiolog from './ConfirmationDiolog';




export default function CreateRecepcion() {
    const validationSchema = yup.object({
        cantidad: yup
            .string('Cantidad')
            .required('Debes ingresar una cantidad'),
        provededor: yup.object("Proveedor").required("Debes seleccionar un proveedor"),
        tipoProducto: yup.object("Tipo de producto").required("Debes seleccionar un tipo de producto"),

    });
    const formik = useFormik({
        initialValues: {
            cantidad: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log({
                cantidad: values.cantidad,
            });
            onAgregarProducto(values.cantidad)
        },
    });
    const [proveedores, setProveedores] = useState([]);
    const [provedor, setProveedor] = useState(undefined);
    const [tiposProductos, setTiposProductos] = useState([]);
    const [tipoProducto, setTipoProducto] = useState(undefined);
    const [cantidad, setCantidad] = useState(0);
    const [productosAgregados, setProductosAgregados] = useState([]);
    const [errorAgregarProductos, setErrorAgregarProductos] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    useEffect(() => {
        let ignore = false;
        ProvService.getProvs().then(response => {
            console.log(response.data);
            cargarProvedores(response.data);
        });
        return () => { ignore = true; }
    }, []);
    const cargarProvedores = (provedores) => {
        setProveedores(provedores)
    }

    const handleChangeProveedor = (event, values) => {
        console.log(values)
        setProveedor(values);
        tipoProductoService.getProductosByProvedor(values.idProv).then(response => {
            setTiposProductos(response.data);
            console.log(response.data);
        })
        setProductosAgregados([]);
        formik.setFieldValue("proveedor", values)
        formik.setFieldValue("tipoProducto", undefined)
    }
    const onProductoChange = (event, value) => {
        console.log(value);
        setTipoProducto(value)
    }
    const onCantidadChange = (event, value) => {
        console.log(value);
        setCantidad(value)
    }
    const onAgregarProducto = (cantidad) => {
        if (provedor === undefined || provedor === null || tipoProducto === undefined || tipoProducto === null) {
            setErrorAgregarProductos("Debes seleccionar un proveedor y un tipo de producto");
            return;
        }else{
            setErrorAgregarProductos("");
        }

        var indiceSiYaExiste = productosAgregados.indexOf(productosAgregados.find(object => object.producto === tipoProducto));

        if (indiceSiYaExiste != -1) {

            productosAgregados[indiceSiYaExiste] = {
                producto: tipoProducto,
                cantidad: productosAgregados[indiceSiYaExiste].cantidad + cantidad
            }
            setProductosAgregados([...productosAgregados]);
            return
        }
        const nuevoProductoAgregadp = {
            producto: tipoProducto,
            cantidad: cantidad
        }

        setProductosAgregados([...productosAgregados, nuevoProductoAgregadp]);
        console.log(productosAgregados);
    }

    const onCrearRecepcion= () => {



        const recepcion = {

            fechaRecepcion: new Date(),
            provedor : provedor,

            productos:productosAgregados,
            
            estadoRecepcion:[{
                tipoEstado: "PENDIENTE",
                fecha: new Date(),
                usuario: {
                    idUsuario: localStorage.getItem("idUsuario"),
                }
            }]
        }



        recepcionService.crearRecepcion(recepcion).then(response => {
            console.log(response.data);
            setOpenConfirmation(false);
            
        });

    }

    return (
        <div className='background'>
            <Grid container>
                <Grid item xs={false} md={1}>

                </Grid>
                <Grid item xs={10} md={5}>
                    <Paper >
                        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-demo"
                                options={proveedores}
                                onChange={handleChangeProveedor}
                                getOptionLabel={(option) => option.nombreProv || ""}


                                error={formik.touched.provededor && Boolean(formik.errors.provededor)}


                                renderInput={(params) => <TextField {...params} label="Proveedor" />}
                            />
                            <Autocomplete
                                fullWidth
                                disablePortal
                                id="combo-box-producto"
                                options={tiposProductos}
                                onChange={onProductoChange}
                                getOptionLabel={(option) => option.nombre + " " + option.codigoDeBarras}
                                error={formik.touched.tipoProducto && Boolean(formik.errors.tipoProducto)}
                                renderInput={(params) => <TextField {...params} label="Productos" />}
                            />

                         
                            <TextField
                                fullWidth
                                id="cantidad"
                                name="cantidad"
                                label="Cantidad"
                                type="number"
                                value={formik.values.cantidad}
                                onChange={formik.handleChange}
                                error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                                helperText={formik.touched.cantidad && formik.errors.cantidad}
                            />
                            <Button color="primary" align="center" type="submit">
                                Agregar Prodcuto
                            </Button>
                            <p align="center" >
                                {errorAgregarProductos}
                            </p>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={false} md={1}>

                </Grid>
                <Grid item xs={10} md={5}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id Producto</TableCell>
                                    <TableCell align="center">Nombre</TableCell>
                                    <TableCell align="center">Codigo de Barras</TableCell>
                                    <TableCell align="center">Precio</TableCell>
                                    <TableCell align="center">Cantidad</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productosAgregados.map((producto) => (
                                    <TableRow
                                        key={producto.producto.idTipoProd}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >

                                        <TableCell align="center">{producto.producto.nombre}</TableCell>
                                        <TableCell align="center">{producto.producto.provedor.nombreProv}</TableCell>
                                        <TableCell align="center">{producto.producto.codigoDeBarras}</TableCell>
                                        <TableCell align="center">${producto.producto.precio}</TableCell>
                                        <TableCell align="center">{producto.cantidad}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button color="primary" align="rigth" onClick={()=>setOpenConfirmation(true)}>
                            Crear Recepcion
                        </Button>
                    </TableContainer>

                </Grid>
            </Grid>

            <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta crear la recepcion?" onNoAccept={() => setOpenConfirmation(false)} onAccept={() => onCrearRecepcion} ></ConfirmationDiolog>
        </div>
    )

}
