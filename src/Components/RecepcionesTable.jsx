



import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import recepcionService from '../Servicios/RecepcionService';
import moment from 'moment';
import { Button, Grid } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";

import { Link } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

export default function RecepcionesTable(props) {
    const [recepciones, setRecepciones] = useState([]);
    const [filteredRecepciones, setfilteredRecepciones] = useState([]);
    const navigate = useNavigate();
    const [searched, setSearched] = useState("");

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
    const requestSearch = (searchedVal) => {
        const filteredRows = recepciones.filter((row) => {
            return row.idRecepcion.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
                row.provedor.nombreProv.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row.estadoRecepcion[row.estadoRecepcion.length - 1].tipoEstado.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row.estadoRecepcion[0].usuario.nombre.toString().toLowerCase().includes(searchedVal.toLowerCase())
                ;
        });
        console.log(searchedVal);
        setfilteredRecepciones(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    return (
        <div >
            <Container maxWidth="md">

            <Grid container spacing={3} >
                <Grid item xs={12} align="center">
                        <h2 className='titulo2'>Recepciones</h2>

                    <SearchBar placeholder='Buscar' 
                        value={searched} className='searchbar'
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />

                </Grid>
                <Grid item xs={12}  >

                        <Link to="/crearRecepcion">
                            <Button variant="contained" color="primary" align="center">Crear Nueva Recepcion</Button>
                        </Link>
                </Grid>


                <Grid item xs={12}>

                            <table sx={{ minWidth: 650 }} className='table table-striped table-hover mt-5 shadow-lg'>
                            <thead className="tableHead">
                                <tr>
                                    <th align="center">Id Recepcion</th>
                                    <th align="center">Proveedor</th>
                                    <th align="center">Estado Recepcion</th>
                                    <th align="center">Creado Por</th>
                                    <th align="center">Fecha Recepcion</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filteredRecepciones.map((recepcion) => (
                                    <tr 
                                        onClick={() => navigate('/detalleRecepcion', {
                                            state: recepcion // your data array of objects
                                        })}

                                        key={recepcion.idRecepcion}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <th align="center">{recepcion.idRecepcion}</th>
                                        <th align="center">{recepcion.provedor.nombreProv}</th>
                                        <th align="center">{recepcion.estadoRecepcion[recepcion.estadoRecepcion.length - 1]?.tipoEstado}</th>
                                        <th align="center">{recepcion.estadoRecepcion[0]?.usuario.nombre}</th>
                                        <th align="center">{moment(new Date(recepcion.fechaRecepcion)).format('D/M/YY')}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </Grid>

            </Grid>
                </Container>

        </div>
    );
}
