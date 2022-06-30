import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';

const TablaProductosPedido = ({ xs, md, productosAgregados }) => {
    return (
        <>
            <Grid item xs={xs} md={md}>
                <TableContainer component={Paper} className='formPaperContainer'>
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
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <TableContainer component={Paper} className='formPaperContainer'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Cantidad total de Productos</TableCell>
                                <TableCell align="center">Costo Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}>
                                <TableCell align="center">{productosAgregados.reduce((total, pedidoProducto) => total + pedidoProducto.cantidad, 0)}</TableCell>
                                <TableCell align="center">${productosAgregados.reduce((total, pedidoProducto) => total + (pedidoProducto.cantidad * pedidoProducto.producto.precio), 0)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>
    );
}

export default TablaProductosPedido;
