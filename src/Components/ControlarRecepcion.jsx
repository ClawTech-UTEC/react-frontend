




import { Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { useLocation } from 'react-router-dom';
import { Container } from 'reactstrap';
import recepcionService from '../Servicios/RecepcionService';
import ConfirmationDiolog from './ConfirmationDiolog';

const ControlarRecepcion = () => {
    let location = useLocation();
    const [searched, setSearched] = useState("");
    const [error, setError] = useState("");
    const [cantidadesRecibidas, setCantidadesRecibidas] = useState({});
    const recepcion = location.state;
    const [openConfirmation, setOpenConfirmation] = useState(false);

    const cancelSearch = () => {
        setSearched("");

    };
    const onSearch = (searchedVal) => {
        setSearched(searchedVal);
        recepcion.productos.forEach(producto => {
            if (producto.producto.codigoDeBarras.toString() === searchedVal) {
                var viejaCantidad = parseInt(document.getElementById(producto.idRecepcionProducto.toString()).value);
                document.getElementById(producto.idRecepcionProducto).value = viejaCantidad + 1;
                setSearched("");

            }
        });
    }
    const onSubmit = (event) => {
        event.preventDefault();
        let todoOk = true;
        recepcion.productos.forEach(producto => {
            const cantidadEsperada = producto.cantidad;
            const cantidadRecibida = parseInt(document.getElementById(producto.idRecepcionProducto.toString()).value);

            if (cantidadRecibida !== cantidadEsperada) {
                setError(`Existen diferencias entre las cantidades recibidas y las esperadas - Corrige las cantidades`);
                todoOk = false;
                return
            }
          

          
        });
        setOpenConfirmation(todoOk);
    }

    const onConfirm = () => {
        recepcion.productos.forEach(producto => {
            const cantidad = parseInt(document.getElementById(producto.idRecepcionProducto.toString()).value).toString();
            const idProducto = producto.producto.idTipoProd.toString();
            console.log(cantidad);
            console.log(idProducto);
            cantidadesRecibidas[idProducto] = cantidad;
            setCantidadesRecibidas(cantidadesRecibidas);
        })
        console.log(cantidadesRecibidas);
        recepcionService.controllarRecepcion(
            recepcion.idRecepcion,
            cantidadesRecibidas,
            parseInt(localStorage.getItem('idUsuario')),
            true
        ).then(response => {
            if (response.status === 200) {
                window.location.replace("http://localhost:3000/");
            }
        }).catch(error => {
            setError(error.response.data.message);
        })

    }

    return (
        <div className='background'>
            <Container >
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12}>
                            <Typography variant='h5' className='titulo1'>
                                Controlar Recepcion
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}  >
                            <SearchBar id="searchBar"
                                value={searched} onChange={(searchVal) => onSearch(searchVal)}
                                onCancelSearch={() => cancelSearch()}
                            />
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                        <Grid xs={6} item container spacing={2} component={Paper} align="center">
                            <Grid item xs={6} align="left">
                                <Typography variant="h6">
                                    Recepcion No. {recepcion.idRecepcion}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Proveedor: {recepcion.provedor.nombreProv}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Estado: {recepcion.estadoRecepcion[recepcion.estadoRecepcion.length - 1].tipoEstado}
                                </Typography>
                            </Grid>
                            <Grid item xs={6} align="left">
                                <Barcode value={recepcion.idRecepcion.toString()} height={50}>
                                </Barcode>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" />
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer >
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Producto</TableCell>
                                                <TableCell align="center">Codigo</TableCell>
                                                <TableCell align="center">Cantidad</TableCell>
                                                <TableCell align="center">Cantidad Recibida</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recepcion.productos.map((producto) => (
                                                <TableRow
                                                    key={producto.idRecepcionProducto}
                                                    sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}>
                                                    <TableCell align="center">{producto.producto.nombre}</TableCell>
                                                    <TableCell align="center">{producto.producto.codigoDeBarras}</TableCell>
                                                    <TableCell align="center">{producto.cantidad}</TableCell>
                                                    <TableCell align="center">
                                                        <TextField id={producto.idRecepcionProducto.toString()} type="number" defaultValue={0} >
                                                        </TextField>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="primary" type="submit" >Aceptar</Button>

                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={3}>

                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='body1' >
                                    {error}
                                </Typography>
                            </Grid>

                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                    </Grid>
                </form>
            </Container>
            <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta crear la recepcion?" onNoAccept={() => setOpenConfirmation(false)} onAccept={() => onConfirm} ></ConfirmationDiolog>

        </div>


    );
}

export default ControlarRecepcion;
