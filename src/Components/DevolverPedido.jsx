import { Box, Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundGrid from './Comons/BackgroundGrid'
import TablaProductosPedido from './Comons/TablaProductosPedido';
import Title from './Comons/Title'
import moment from 'moment';
import Barcode from 'react-barcode';
import { distribuidorService } from '../Servicios/DistribuidorPedido';
import { Alert, Autocomplete } from '@mui/material';
import { pedidosService } from '../Servicios/PedidosService';
import ConfirmationDiolog from './ConfirmationDiolog';
import InformationDiolog from './InformationDiolog';
export default function DevolverPedido() {

    let location = useLocation();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState(location.state);
    const [error, setError] = useState("");
    const [openInformation, setOpenInformation] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false);


    


    

    const onSubmit = (event) => {
        event.preventDefault();

        
        setOpenConfirmation(true);



    };


    const onConfirm = () => {

        pedidosService.devolverPedido(
            {
                idPedido: pedido.idPedido,
                idUsuaurio: parseInt(localStorage.getItem('idUsuario')),
            }
        ).then(response => {
            if (response.status === 200) {
                setOpenInformation(true);
            }
        }).catch(error => {
            setError(error.response.data.message);
        })

    }
    const onVolver = () => {
        navigate("/pedidos");
        setOpenInformation(false);
    };


    return (
        <form onSubmit={onSubmit}>
            <BackgroundGrid >
                <Grid container spacing={2} align="center">
                    <Grid item xs={12}>
                        <Typography variant='h5' className='titulo1'>
                            Devoler Pedido
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
                        <TablaProductosPedido xs={12} productosAgregados={pedido.productos} />

                        <Grid item xs={3}>
                        </Grid>
                       
                        <Grid item xs={12}>

                            {error ?
                                <Alert severity="error"> {error}</Alert> : <div />}


                        </Grid>
                    </Grid>

                    <Grid item xs={0} md={3}>

                    </Grid>



                    <Grid item xs={12}>


                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" >Aceptar</Button>

                    </Grid>
                </Grid>
                <ConfirmationDiolog open={openConfirmation} title="Confirmar" descripcion="¿Acepta devolver el pedido?" onNoAccept={() => setOpenConfirmation(false)} onAccept={() => onConfirm} ></ConfirmationDiolog>
                <InformationDiolog open={openInformation} title="Pedido Devuelto con Exito" onAccept={onVolver}></InformationDiolog>

            </BackgroundGrid></form>
    )
}
