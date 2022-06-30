import { Button, Grid } from '@material-ui/core';
import React from 'react';
import ButtonFormulario from './Button';

const BotonesDetallePedido = ({ estadoPedido, pedido, onCancelarPedido, onPrepararPedido, onControlarPedido, onDespacharPedido, onEntregarPedido, onDevolverPedido
}) => {
console.log(estadoPedido);
    return (
        <Grid item xs={12} spacing={1}
>
            {estadoPedido === "PENDIENTE" ? <ButtonFormulario variant="contained" c
                olor="primary" onClick={onPrepararPedido}>Prepar</ButtonFormulario> : <div></div>}
          
            {estadoPedido === "PREPARADO" ? <ButtonFormulario variant="contained" c
                olor="primary" onClick={onControlarPedido}>Controlar</ButtonFormulario> : <div></div>}
          
            {estadoPedido === "CONTROLADO" ? <ButtonFormulario variant="contained" c
                olor="primary" onClick={onDespacharPedido}> Despachar</ButtonFormulario> : <div></div>}
         
            {estadoPedido === "DESPACHADO" ? <ButtonFormulario variant="contained" c
                olor="primary" onClick={onEntregarPedido}> Entregar</ButtonFormulario> : <div></div>}
          
            {estadoPedido === "ENTREGADO" ? <ButtonFormulario variant="contained" 
                olor="primary" onClick={onDevolverPedido}> Devolver</ButtonFormulario> : <div></div>}
            <ButtonFormulario variant="contained" color="primary" >Imprimir</ButtonFormulario>
          
            {estadoPedido !== "CANCELADO" ? <ButtonFormulario variant="contained"
                color="primary" onClick={onCancelarPedido}> Cancelar</ButtonFormulario> : <div></div>}
        </Grid>
    );
}

export default BotonesDetallePedido;
