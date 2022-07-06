



import { Box, Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Barcode from 'react-barcode';
import moment from 'moment';
import { pedidosService } from '../Servicios/PedidosService';
import InformationDiolog from './InformationDiolog';
import ConfirmationDiolog from './ConfirmationDiolog';
import TablaProductosPedido from './Comons/TablaProductosPedido';
import BotonesDetallePedido from './Comons/BotonesDetallePedido';
import BackgroundGrid from './Comons/BackgroundGrid';

const DetallePedido = () => {
    const initialValue = 0;
    const navigate = useNavigate();
    let location = useLocation();
    const [openInformation, setOpenInformation] = useState(false);
    const [pedido, setPedido] = useState(location.state);
    const [error, setError] = useState("");
    const [openCancelarConfirmation, setOpenCancelarConfirmation] = useState(false);
    const total = pedido.productos.reduce((total, pedidoProducto) => total + (pedidoProducto.cantidad * pedidoProducto.producto.precio), initialValue);
    const onCancelarPedido = () => {
        pedidosService.cancelarPedido(pedido.idPedido, localStorage.getItem("idUsuario")).then((responce) => {
            if (responce.status === 200) {
                setOpenInformation(true);
            } else {
                error("Error al cancelar la pedido");
            }
        })

    }
    const onVolver = () => {
        navigate("/pedidos");
        setOpenInformation(false);
    };

    const onPrepararPedido = () => {

        navigate("/prepararPedido"
            , { state: pedido });
    }


    const onControlarPedido = () => {

        navigate("/controlarPedido"
            , { state: pedido });
    }
    const onDespacharPedido = () => {

        navigate("/despacharPedido"
            , { state: pedido });
    }

    const onEntregarPedido = () => {
        navigate("/entregarPedido"
            , { state: pedido });
    }

    const onDevolverPedido = () => {
        navigate("/devolverPedido"
            , { state: pedido });
    }
    const onImprimirPedido = () => 
        pedidosService.downloadRemitoPdf(pedido.idPedido);
    


    return (
        <>
            <BackgroundGrid >
                <Grid container spacing={2} align="center">
                    <Grid item xs={12}>
                        <Typography variant='h5' className='titulo1'>
                            Detalle Pedido
                        </Typography>
                    </Grid>

                    <Grid item xs={0} md={3}>
                    </Grid>
                    <Grid xs={12} md={6} item container spacing={2} component={Paper} align="center">
                        <Grid item xs={6} align="left">
                            <Typography variant="h6">
                                Pedido No. {pedido.idPedido}
                            </Typography>
                            <Typography variant="subtitle1">
                                Cliente: {pedido.cliente.razonSocial}
                            </Typography>
                            <Typography variant="subtitle1">
                                Estado: {pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido}
                            </Typography>
                            <Typography variant="subtitle1">
                                Fecha: {moment(new Date(pedido.fechaPedido)).format('D/M/YY')}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} align="left">
                            <Barcode value={pedido.idPedido} height="50px">
                            </Barcode>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider variant="middle" />
                        </Grid>
                        <TablaProductosPedido component={Paper} xs={12} productosAgregados={pedido.productos} />
                        <BotonesDetallePedido xs={12} estadoPedido={pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido}
                            onCancelarPedido={() => setOpenCancelarConfirmation(true)}
                            onPrepararPedido={() => onPrepararPedido()}
                            onControlarPedido={() => onControlarPedido()}
                            onDespacharPedido={() => onDespacharPedido()}
                            onEntregarPedido={() => onEntregarPedido()}
                            onDevolverPedido={() => onDevolverPedido()}
                            onImprimirPedido={() => onImprimirPedido()}
                        />
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                    <Grid item xs={0} md={3}>

                    </Grid>
                </Grid>
            </BackgroundGrid>
            <ConfirmationDiolog open={openCancelarConfirmation} title="Confirmar" descripcion="¿Acepta cancelar la pedido?" onNoAccept={() => setOpenCancelarConfirmation(false)} onAccept={() => onCancelarPedido} ></ConfirmationDiolog>
            <InformationDiolog open={openInformation} title="Pedido Cancelada con Exito" onAccept={onVolver}></InformationDiolog>
        </>
    );
}
export default DetallePedido;
