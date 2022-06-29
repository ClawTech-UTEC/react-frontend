import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';

const CrearPedido = () => {

    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [todosLosProductos, setTodosLosProductos] = useState([]);
    




    return (
        <div className='background'>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"

            >
                <Grid item xs={12}>
                    <Typography variant='h5' className='titulo1' >
                        Crear Pedido
                    </Typography>
                </Grid>


            </Grid>

        </div>
    );
}

export default CrearPedido;
