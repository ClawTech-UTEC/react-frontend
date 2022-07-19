import { Box, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Autocomplete, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockService } from '../Servicios/StockService';
import { useFormik } from 'formik';

import * as yup from 'yup';
import SearchBar from 'material-ui-search-bar';
import ConfirmationDiolog from './ConfirmationDiolog';
import { pedidosService } from '../Servicios/PedidosService';
import { clienteService } from '../Servicios/ClienteService';
import BackgroundGrid from './Comons/BackgroundGrid';
import Title from './Comons/Title';
import BarCodeReader from './Comons/BarCodeReader';
import TablaProductosPedido from './Comons/TablaProductosPedido';
const CrearPedido = () => {

    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(undefined);
    const [errorAgregarProductos, setErrorAgregarProductos] = useState("");
    const [productosAgregados, setProductosAgregados] = useState([]);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [searched, setSearched] = useState("");
    const [clientes, setclientes] = useState([]);
    const [errorGeneral, setErrorGeneral] = useState("");

    const navigate = useNavigate();
    const validationSchemaProductos = yup.object({
        cantidad: yup
            .number('Cantidad').min(1, 'La cantidad debe ser mayor a 0')
            .required('Debes ingresar una cantidad'),
        tipoProducto: yup.object("producto").required("Debes seleccionar un producto"),
    });
    const formikProductos = useFormik({
        initialValues: {
            cantidad: 1,
        },
        validationSchema: validationSchemaProductos,
        onSubmit: (values) => {
            onAgregarProducto(productoSeleccionado, values.cantidad);
        },
    });

    const validationSchemaClientes = yup.object({
        documento: yup.string('Documento').required('Debes ingresar un documento'),
        nombre: yup.string('Nombre Contacto').required('Debes ingresar un nombre'),
        razonSocial: yup.string('Razon Social').required('Debes ingresar un apellido'),
        ciudad: yup.string('Ciudad').required('Debes ingresar una ciudad'),
        direccion: yup.string('Direccion').required('Debes ingresar una direccion'),
        telefono: yup.string('Telefono').required('Debes ingresar un telefono'),
        email: yup.string('Email').required('Debes ingresar un email'),

    });

    const formikCliente = useFormik({
        initialValues: {
            documento: "",
            nombre: "",
            razonSocial: "",
            ciudad: "",
            direccion: "",
            telefono: "",
            email: "",

        },
        validationSchema: validationSchemaClientes,
        onSubmit: (values) => {
            if (productosAgregados.length === 0) {
                setErrorGeneral("Debes agregar al menos un producto");
                return;
            }
            setOpenConfirmation(true);
        }
    })

    useEffect(() => {
        let ignore = false;
        stockService.getProductos().then(response => {
            console.log(response.data);
            cargarProductos(response.data);
        });

        clienteService.getClientes().then(response => {
            console.log(response.data);
            cargarClientes(response.data);
        }
        )

        return () => { ignore = true; };
    }, []);

    const cargarProductos = (productos) => {
        setProductosDisponibles(productos);
    }
    const cargarClientes = (clientes) => {
        setclientes(clientes);
    }

    const handleProductoChange = (event, value) => {
        setProductoSeleccionado(value);
    }

    const onAgregarProducto = (producto, cantidad) => {


        if (producto === undefined || producto === null) {
            setErrorAgregarProductos("Debes seleccionar un producto");
            return;
        } else if (cantidad > producto.cantidadDisponible) {
            setErrorAgregarProductos("No hay suficiente cantidad disponible");
            return;
        }
        else {
            setErrorAgregarProductos("");
        }
        let tipoProducto = producto.tipoProducto
        let indiceSiYaExiste = productosAgregados.indexOf(productosAgregados.find(object => object.producto === tipoProducto));
        if (indiceSiYaExiste !== -1) {
            if (productosAgregados[indiceSiYaExiste].cantidad + cantidad > producto.cantidadDisponible) {
                setErrorAgregarProductos("No hay suficiente cantidad disponible");
                return;
            }
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
    }


    const onSearch = (searchedVal) => {
        setSearched(searchedVal);
        productosDisponibles.forEach(producto => {
            if (producto.tipoProducto.codigoDeBarras.toString() === searchedVal) {
                setProductoSeleccionado(producto);
                onAgregarProducto(producto, 1);
                setSearched("");

            }
        });
    }

    const cancelSearch = () => {
        setSearched("");

    };


    const clienteChange = (event, value) => {
        console.log("Valor recibido");
        console.log(value);
        formikCliente.setFieldValue("documento", value.documento);
        formikCliente.setFieldValue("nombre", value.nombre);
        formikCliente.setFieldValue("razonSocial", value.razonSocial);
        formikCliente.setFieldValue("ciudad", value.ciudad);
        formikCliente.setFieldValue("direccion", value.direccion);
        formikCliente.setFieldValue("telefono", value.telefono);
        formikCliente.setFieldValue("email", value.email);
    }




    const onCrearPedido = () => {
        let pedido = {
            cliente: formikCliente.values,
            productos: productosAgregados,
            fechaPedido: new Date(),
            direccion: formikCliente.values.direccion,
            total: calcularTotal(),
            estadoPedido: [{
                fecha: new Date(),
                tipoEstadoPedido: "PENDIENTE",
                usuario: {
                    idUsuario: localStorage.getItem("idUsuario")
                }
            }]

        }




        pedidosService.createPedido(pedido).then(response => {
            console.log("respuesta")
            console.log(response.data);
            navigate('/detallePedido', {
                state: response.data
            });
            setOpenConfirmation(false);
        })

    }

    const calcularDisponible = () => {
        let tipoProducto = productoSeleccionado.tipoProducto;

        let indiceSiYaExiste = productosAgregados.indexOf(productosAgregados.find(object => object.producto === tipoProducto));
        let cantidadYaAgregada = 0;
        if (indiceSiYaExiste !== -1) {

            cantidadYaAgregada = productosAgregados[indiceSiYaExiste].cantidad;
        }
        return productoSeleccionado.cantidadDisponible - cantidadYaAgregada;


    }


    const calcularTotal = () => {
        let total = 0;
        console.log("productosAgregados");
        console.log(productosAgregados);
        productosAgregados.forEach(producto => {
            total += producto.cantidad * producto.producto.precioDeVenta;
        }
        )
        return total;
    }

    return (
        <BackgroundGrid spacing={1}>

            <Title title="Crear Pedido" />
            <BarCodeReader xs={12} id="searchBar" placeholder="Ingresar Codigo De Barras"
                value={searched} onChange={(searchVal) => onSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
            <Grid item xs={12} />
            <Grid item xs={12} component="Paper">
                <Paper container className='formPaperContainer' >
                    <Box component="form" noValidate onSubmit={formikProductos.handleSubmit}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"

                            options={productosDisponibles}
                            onChange={handleProductoChange}
                            getOptionLabel={(option) => option.tipoProducto.nombre || ""}
                            error={formikProductos.touched.tipoProducto && Boolean(formikProductos.errors.tipoProducto)}
                            renderInput={(params) => <TextField {...params} label="Producto" />}
                        />
                        <Grid item xs={12} >
                           
                            </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="cantidad"
                                name="cantidad"
                                label="Cantidad"
                                type="number"
                                value={formikProductos.values.cantidad}
                                onChange={formikProductos.handleChange}
                                error={formikProductos.touched.cantidad && Boolean(formikProductos.errors.cantidad)}
                                helperText={formikProductos.touched.cantidad && formikProductos.errors.cantidad}
                            />
                            {productoSeleccionado ?
                                <Alert severity="info"> Disponible: {calcularDisponible()}</Alert> : <div />
                            }

                        </Grid>
                            <Button color='primary'

                               align="center" type="submit">
                                Agregar Prodcuto
                            </Button>
                        
                        {errorAgregarProductos ?
                            <Alert severity="error"> {errorAgregarProductos}</Alert> : <div />
                        }
                    </Box>
                </Paper>
            </Grid>


            <Title title={"Detalle Pedido"} >

            </Title>
            <TablaProductosPedido component={Paper} xs={12} md={12} productosAgregados={productosAgregados}/>


            

            <Title title={"Datos del cliente"}/>
               

            <Grid item xs={12} component="paper">
                <Paper container className='formPaperContainer' >
                    <Box component="form" noValidate onSubmit={formikCliente.handleSubmit}>
                        <Autocomplete
                            id="combo-box-documento"
                            options={clientes}
                            onChange={clienteChange}
                            getOptionLabel={(option) => option.documento || ""}
                            error={formikCliente.touched.documento && Boolean(formikCliente.errors.documento)}
                            renderInput={(params) => <TextField {...params} label="Buscar cliente" />}
                        />
                        <TextField
                            fullWidth
                            id="documento"
                            name="documento"
                            label="Documento"
                            type="text"
                            value={formikCliente.values.documento}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.documento && Boolean(formikCliente.errors.documento)}
                            helperText={formikCliente.touched.documento && formikCliente.errors.documento}
                        />

                        <TextField
                            fullWidth
                            id="nombre"
                            name="nombre"
                            label="Nombre de Contacto"
                            type="text"
                            value={formikCliente.values.nombre}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.nombre && Boolean(formikCliente.errors.nombre)}
                            helperText={formikCliente.touched.nombre && formikCliente.errors.nombre}
                        />


                        <TextField
                            fullWidth
                            id="razonSocial"
                            name="razonSocial"
                            label="Razon Social"
                            type="text"
                            value={formikCliente.values.razonSocial}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.razonSocial && Boolean(formikCliente.errors.razonSocial)}
                            helperText={formikCliente.touched.razonSocial && formikCliente.errors.razonSocial}
                        />
                        <TextField
                            fullWidth
                            id="ciudad"
                            name="ciudad"
                            label="Ciudad"
                            type="text"
                            value={formikCliente.values.ciudad}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.ciudad && Boolean(formikCliente.errors.ciudad)}
                            helperText={formikCliente.touched.ciudad && formikCliente.errors.ciudad}
                        />

                        <TextField
                            fullWidth
                            id="direccion"
                            name="direccion"
                            label="Direccion"
                            type="text"
                            value={formikCliente.values.direccion}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.direccion && Boolean(formikCliente.errors.direccion)}
                            helperText={formikCliente.touched.direccion && formikCliente.errors.direccion}
                        />

                        <TextField
                            fullWidth
                            id="telefono"
                            name="telefono"
                            label="Telefono"
                            type="text"
                            value={formikCliente.values.telefono}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.telefono && Boolean(formikCliente.errors.telefono)}
                            helperText={formikCliente.touched.telefono && formikCliente.errors.telefono}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="email"
                            type="email"
                            value={formikCliente.values.email}
                            onChange={formikCliente.handleChange}
                            error={formikCliente.touched.email && Boolean(formikCliente.errors.email)}
                            helperText={formikCliente.touched.email && formikCliente.errors.email}
                        />
                        <Button 
                            
                              color="primary" align="center" type="submit">
                            Crear Pedido
                        </Button>
                        {errorGeneral ?
                            <Alert severity="error"> {errorGeneral}</Alert> : <div />
                        }
                    </Box>
                </Paper>
            </Grid>

            <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta crear el pedido?"
                onNoAccept={() => setOpenConfirmation(false)}
                onAccept={() => onCrearPedido} ></ConfirmationDiolog>

        </BackgroundGrid>
    );
}

export default CrearPedido;
