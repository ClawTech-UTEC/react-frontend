import { FormControl, FormHelperText, Grid, Input, InputLabel, Paper, Select, TextField, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { Autocomplete } from '@mui/material';
import React, { PureComponent } from 'react'

import { useEffect, useState } from 'react';
import ProvService from '../Servicios/ProvService';
import tipoProductoService from '../Servicios/TipoProductoService';





export default function CreateRecepcion() {


    const [proveedores, setProveedores] = useState([]);
    const [provedor, setProveedor] = useState(undefined);
    const [tiposProductos, setTiposProductos] = useState([]);
    const [tipoProducto, setTipoProducto] = useState(undefined);
    const [cantidad, setCantidad] = useState(0);
    const [productosAgregados, setProductosAgregados] = useState([]);

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
    }

    const onProductoChange = (event, value) => {
        console.log(value);

        setTipoProducto(value)
    }
    const onCantidadChange = (event, value) => {
        console.log(value);

        setCantidad(value)
    }
    const onAgregarProducto = (event) => {
        event.preventDefault();
        let cantidad = parseInt(document.getElementById("cantidadField").value)
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

    const onCrearRecepcion = (event) => {


        
    }

    return (
        <div className='background'>
            <Grid container>
                <Grid item xs={2}>

                </Grid>
                <Paper >
                    <FormControl >
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={proveedores}
                            onChange={handleChangeProveedor}
                            getOptionLabel={(option) => option.nombreProv || ""}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Proveedor" />}
                        />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={tiposProductos}
                            onChange={onProductoChange}
                            getOptionLabel={(option) => option.nombre || ""}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Productos" />}
                        />

                        <TextField id='cantidadField' label="Cantidad" onChange={onCantidadChange} />


                        <Button color="primary" align="center" onClick={onAgregarProducto}>
                            Agregar Prodcuto
                        </Button>
                    </FormControl>
                </Paper>
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={5}>
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
                                        <TableCell align="center">{producto.producto.precio}</TableCell>
                                        <TableCell align="center">{producto.cantidad}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button color="primary" align="rigth" onClick={onAgregarProducto}>
                            Crear Recepcion
                        </Button>
                    </TableContainer>
                   
                </Grid>
            </Grid>



        </div>
    )

}
