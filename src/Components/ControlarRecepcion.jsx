




import { Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import SearchBar from 'material-ui-search-bar';
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import recepcionService from '../Servicios/RecepcionService';
import BackgroundGrid from './Comons/BackgroundGrid';
import BarCodeReader from './Comons/BarCodeReader';
import TablaCantidadesProducto from './Comons/TablaCantidadesProducto';
import Title from './Comons/Title';
import ConfirmationDiolog from './ConfirmationDiolog';
import InformationDiolog from './InformationDiolog';

const ControlarRecepcion = () => {
    let location = useLocation();
    const [searched, setSearched] = useState("");
    const [error, setError] = useState("");
    const [cantidadesRecibidas, setCantidadesRecibidas] = useState({});
    const [recepcion, setRecepcion] = useState(location.state);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const navigate = useNavigate();
    const [openInformation, setOpenInformation] = useState(false);

    const cancelSearch = () => {
        setSearched("");

    };
    const onSearch = (searchedVal) => {
        setSearched(searchedVal);
        recepcion.productos.forEach(producto => {
            if (producto.producto.codigoDeBarras.toString() === searchedVal) {
                var viejaCantidad = parseInt(document.getElementById(producto.producto.idTipoProd.toString()).value);
                if (viejaCantidad >= producto.cantidad) {
                    setError("La cantidad recibida es mayor a la cantidad solicitada");
                    return

                }

                document.getElementById(producto.producto.idTipoProd).value = viejaCantidad + 1;
                setSearched("");

            }
        });
    }
    const onSubmit = (event) => {
        event.preventDefault();
        let todoOk = true;
        recepcion.productos.forEach(producto => {
            const cantidadEsperada = producto.cantidad;
            const cantidadRecibida = parseInt(document.getElementById(producto.producto.idTipoProd.toString()).value);

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
            const cantidad = parseInt(document.getElementById(producto.producto.idTipoProd.toString()).value).toString();
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
                setOpenInformation(true);
            }
        }).catch(error => {
            setError(error.response.data.message);
        })

    }
    const onVolver = () => {
        navigate("/recepciones");
        setOpenInformation(false);
    };
    return (
        <BackgroundGrid>

            <form onSubmit={onSubmit}>
                <Grid container spacing={2} align="center">
                    <Title title={"Controlar Recepcion"} />
                    <Grid item xs={3}>
                    </Grid>
                    <BarCodeReader
                        xs={6}
                        value={searched} onChange={(searchVal) => onSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />

                    <Grid item xs={3}>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                    <Grid xs={6} item container component={Paper} align="center">
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
                        <TablaCantidadesProducto listaProductosCantidad={recepcion.productos} />

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

                            {error ?
                                <Alert severity="error"> {error}</Alert> : <div />}


                        </Grid>

                    </Grid>
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
            </form>

            <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta crear la recepcion?" onNoAccept={() => setOpenConfirmation(false)} onAccept={() => onConfirm} ></ConfirmationDiolog>
            <InformationDiolog open={openInformation} title="Recepcion Controlada con Exito" onAccept={onVolver}></InformationDiolog>

        </BackgroundGrid>


    );
}

export default ControlarRecepcion;
