


import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import React from 'react';

const TablaCantidadesProducto = ({listaProductosCantidad}) => {

    return (
        <Grid item xs={12} >
            <TableContainer className='formPaperContainer'>
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
                        {listaProductosCantidad.map((producto) => (
                            <TableRow
                                key={producto.producto.idTipoProd}
                                sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}>
                                <TableCell align="center">{producto.producto.nombre}</TableCell>
                                <TableCell align="center">{producto.producto.codigoDeBarras}</TableCell>
                                <TableCell align="center">{producto.cantidad}</TableCell>
                                <TableCell align="center">
                                    <TextField 
                                        InputProps={{
                                            inputProps: {
                                                max: producto.cantidad, min: 0
                                            }
                                        }}
                                    
                                    
                                    id={producto.producto.idTipoProd.toString()} type="number" defaultValue={0} >
                                    </TextField>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default TablaCantidadesProducto;
