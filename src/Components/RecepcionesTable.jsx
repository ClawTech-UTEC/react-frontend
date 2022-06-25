



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
import { Button, Grid } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

import { Link } from "react-router-dom";





export default function RecepcionesTable() {

    const [recepciones, setRecepciones] = useState([]);
    const [filteredRecepciones, setfilteredRecepciones] = useState([]);

    const [searched, setSearched] = useState("");



    const requestSearch = (searchedVal) => {

        const filteredRows = recepciones.filter((row) => {
            return row.idRecepcion.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
            
                row.recepcion.provedor.nombreProv.toLowerCase().includes(searchedVal.toLowerCase()) ||

                row.estadoRecepcion[row.estadoRecepcion.length - 1].tipoEstado.toLowerCase().includes(searchedVal.toLowerCase()) ||

                row.estadoRecepcion[0].usuario.nombre.toString().toLowerCase().includes(searchedVal.toLowerCase()) 
                ;
        });
        console.log(searchedVal);

        setfilteredRecepciones(filteredRows);
    };


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
         setfilteredRecepciones(recepciones)
    }
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    return (
        <div className='background'>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <SearchBar
                        value={searched}
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Link to="/crearRecepcion">
                        <Button variant="contained" color="primary" align="center">Crear Nueva Recepcion</Button>
                    </Link>
                    
                </Grid>
                <Grid item xs={12}>

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
                                {filteredRecepciones.map((recepcion) => (
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
                </Grid>

            </Grid>

        </div>
    );
}
