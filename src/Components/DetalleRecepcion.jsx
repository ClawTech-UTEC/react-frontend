



import { Box, Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import moment from 'moment';

const DetalleRecepcion = () => {
    const initialValue = 0;
    const navigate = useNavigate();
    let location = useLocation();

    const [recepcion, setRecepcion] = useState(location.state);
    const total = recepcion.productos.reduce((total, recepcionProducto) => total + (recepcionProducto.cantidad * recepcionProducto.producto.precio), initialValue);
    return (
        <div className='background'>
            <Container fixed>
                <Grid container spacing={2} align="center">
                    <Grid item xs={12}>
                        <Typography variant='h5' className='titulo1'>
                            Detalle Recepcion
                        </Typography>
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
                            <Typography variant="subtitle1">
                                Fecha: {moment(new Date(recepcion.fechaRecepcion)).format('D/M/YY')}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="left">
                            <Barcode value={recepcion.idRecepcion} height="50px">
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
                                            <TableCell align="center">Cantidad</TableCell>
                                            <TableCell align="center">Precio</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recepcion.productos.map((producto) => (
                                            <TableRow
                                                key={producto.idRecepcionProducto}
                                                sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}>
                                                <TableCell align="center">{producto.producto.nombre}</TableCell>
                                                <TableCell align="center">{producto.cantidad}</TableCell>
                                                <TableCell align="center">${producto.producto.precio}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>


                        <Grid item xs={4}>
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Total</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        <TableRow
                                            key={recepcion.idRecepcion}
                                            sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}>
                                            <TableCell align="center">${total}</TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={8}>

                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" >Imprimir</Button>
                        </Grid>
                        <Grid item xs={4}>
                            {recepcion.estadoRecepcion[recepcion.estadoRecepcion.length - 1].tipoEstado == "PENDIENTE"?         <Button variant="contained" color="primary" onClick={() => navigate('/controlarRecepcion', {
                                state: recepcion // your data array of objects
                            })}>Controlar</Button>: <div></div>}
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary">Cancelar</Button>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid></Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default DetalleRecepcion;
