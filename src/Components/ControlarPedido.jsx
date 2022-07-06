import { Divider, Button, Grid, Paper, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { useLocation, useNavigate } from 'react-router-dom';
import { pedidosService } from '../Servicios/PedidosService';
import BackgroundGrid from './Comons/BackgroundGrid';
import BarCodeReader from './Comons/BarCodeReader';
import TablaCantidadesProducto from './Comons/TablaCantidadesProducto';
import Title from './Comons/Title';
import ConfirmationDiolog from './ConfirmationDiolog';
import InformationDiolog from './InformationDiolog';

const ControlarPedido = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState(location.state);
    const [searched, setSearched] = useState("");
    const [error, setError] = useState("");
    const [openInformation, setOpenInformation] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [cantidadesPreparadas, setCantidadesPreparadas] = useState({});

    const cancelSearch = () => {
        setSearched("");

    };

    const onSearch = (searchedVal) => {
        setSearched(searchedVal);
        pedido.productos.forEach(producto => {
            if (producto.producto.codigoDeBarras.toString() === searchedVal) {
                var viejaCantidad = parseInt(document.getElementById(producto.producto.idTipoProd.toString()).value);
                if (viejaCantidad >= producto.cantidad) {
                    setError("No se pueden agregar mas productos de los solicitados");
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
        pedido.productos.forEach(producto => {
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
    const onVolver = () => {
        navigate("/pedidos");
        setOpenInformation(false);
    };

    const onConfirm = () => {
        pedido.productos.forEach(producto => {
            const cantidad = parseInt(document.getElementById(producto.producto.idTipoProd.toString()).value).toString();
            const idProducto = producto.producto.idTipoProd.toString();
            console.log(cantidad);
            console.log(idProducto);
            cantidadesPreparadas[idProducto] = cantidad;
            setCantidadesPreparadas(cantidadesPreparadas);
        })
        console.log(cantidadesPreparadas);
        pedidosService.controlarPedido(
            pedido.idPedido,
            parseInt(localStorage.getItem('idUsuario')),

        ).then(response => {
            if (response.status === 200) {
                setOpenInformation(true);
            }
        }).catch(error => {
            setError(error.response.data.message);
        })

    }
    return (
        <BackgroundGrid>
            <form onSubmit={onSubmit}>

                <Title
                    title={"Controlar Pedido"}
                ></Title>
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


                <Grid xs={6} item container spacing={2} component={Paper} align="center">
                    <Grid item xs={6} align="left">
                        <Typography variant="h6">
                            Pedido No. {pedido.idPedido}
                        </Typography>
                        <Typography variant="subtitle1">
                            Proveedor: {pedido.cliente.razonSocial}
                        </Typography>
                        <Typography variant="subtitle1">
                            Estado: {pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} align="left">
                        <Barcode value={pedido.idPedido.toString()} height={50}>
                        </Barcode>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" />
                    </Grid>
                    <TablaCantidadesProducto listaProductosCantidad={pedido.productos} />
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
                    <Grid item xs={3}>

                    </Grid>
                </Grid>
                <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta Controlar el pedido?" onNoAccept={() => setOpenConfirmation(false)} onAccept={() => onConfirm} ></ConfirmationDiolog>
                <InformationDiolog open={openInformation} title="Pedido Controlado con Exito" onAccept={onVolver}></InformationDiolog>
            </form>

        </BackgroundGrid>
    );
}

export default ControlarPedido;
