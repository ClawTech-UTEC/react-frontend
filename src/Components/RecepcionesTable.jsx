



import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import recepcionService from '../Servicios/RecepcionService';
import moment from 'moment';






export default function RecepcionesTable() {

    const [recepciones, setRecepciones] = useState([]);

    useEffect(() => {
        let ignore = false;

        recepcionService.getRecepciones().then(response => {

            console.log(response.data);
            cargarRecepciones(response.data);

        });




        return () => { ignore = true; }




    }, []);

    const cargarRecepciones = (recepciones) => {
        setRecepciones(recepciones)
    }


    return (
        <div className='background'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Id Recepcion</TableCell>
                            <TableCell align="center">Proveedor</TableCell>
                            <TableCell align="center">Estado Recepcion</TableCell>
                            <TableCell align="center">Creado Por</TableCell>
                            <TableCell align="center">Fecha Recepcion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recepciones.map((recepcion) => (
                            <TableRow
                                key={recepcion.idRecepcion}
                                sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                            >

                                <TableCell align="center">{recepcion.idRecepcion}</TableCell>
                                <TableCell align="center">{recepcion.provedor.nombreProv}</TableCell>
                                <TableCell align="center">{recepcion.estadoRecepcion[recepcion.estadoRecepcion.length - 1].tipoEstado}</TableCell>
                                <TableCell align="center">{recepcion.estadoRecepcion[0].usuario.nombre}</TableCell>

                                <TableCell align="center">{moment(Date(recepcion.fechaRecepcion)).format('d MMMM YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
