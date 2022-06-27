



import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetalleRecepcion = () => {
    let location = useLocation();
    console.log(location)

    const recepcion = location.state;

    console.log(recepcion)
    return (
        <div >


            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <p>Detalle de recepcion: {recepcion.idRecepcion}</p>
                </Grid>
                <Grid item xs={3}>
                    <p>Detalle </p>
                </Grid>
               






               











                <p>Productos:</p>

                <TableContainer component={Paper}>
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
                                    sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                >

                                    <TableCell align="center">{producto.producto.nombre}</TableCell>
                                    <TableCell align="center">{producto.cantidad}</TableCell>
                                    <TableCell align="center">${producto.producto.precio}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    );
}

export default DetalleRecepcion;
