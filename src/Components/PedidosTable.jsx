import { Grid, Paper, Button, Table, tbody, th, TableContainer, thead, tr } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { pedidosService } from '../Servicios/PedidosService';
import moment from 'moment';
import { Container } from '@mui/material';

export default function PedidosTable() {

    const [pedidos, setPedidos] = useState([]);
    const [filteredPedidos, setfiltePededidos] = useState([]);
    const navigate = useNavigate();
    const [searched, setSearched] = useState("");
    useEffect(() => {
        let ignore = false;
        pedidosService.getPedidos().then(response => {
            console.log(response.data);
            cargarPedidos(response.data);
        });
        return () => { ignore = true; }
    }, []);

    const cargarPedidos = (pedidos) => {
        setPedidos(pedidos)
        setfiltePededidos(pedidos)
    }


    const requestSearch = (searchedVal) => {
        const filteredRows = pedidos.filter((pedido) => {
            return pedido.idPedido.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
                pedido.cliente.nombre.toLowerCase().includes(searchedVal.toLowerCase()) ||
                pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido.toLowerCase().includes(searchedVal.toLowerCase()) ||
                pedido.estadoPedido[0].usuario.nombre.toString().toLowerCase().includes(searchedVal.toLowerCase())
                ;
        });
        console.log(searchedVal);
        setfiltePededidos(filteredRows);
    };
    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };
    return (
        <div >
            <Container maxWidth="md">

            <Grid container spacing={3}>
                <Grid item xs={12}>
                        <h2 className='titulo2'>Pedidos</h2>

                    <SearchBar className='searchbar'
                        value={searched} placeholder='Buscar'
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                </Grid>
                    <Grid item xs={12} > 
                        <Link to="/crearPedido">
                            <Button  variant="contained" color="primary" align="center">Crear Nuevo Pedido</Button>
                    </Link>

                </Grid>
                <Grid item xs={12}>

                        <table sx={{ minWidth: 650 }} className='table table-striped table-hover mt-5 shadow-lg'>
                            <thead className="tableHead">
                                <tr className='bg-curso text-white' >
                                    <th align="center">Id Pedido</th>
                                    <th align="center">Cliente</th>
                                    <th align="center">Estado Pedido</th>
                                    <th align="center">Creado Por</th>
                                    <th align="center">Fecha Pedido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPedidos.map((pedido) => (
                                    <tr
                                        onClick={() => navigate('/detallePedido', {
                                            state: pedido // your data array of objects
                                        })}

                                        key={pedido.idPedido}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <th align="center">{pedido.idPedido}</th>
                                        <th align="center">{pedido.cliente.nombre}</th>
                                        <th align="center">{pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido}</th>
                                        <th align="center">{pedido.estadoPedido[0].usuario.nombre}</th>
                                        <th align="center">{moment(new Date(pedido.fechaPedido)).format('D/M/YY')}</th>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </Grid>

            </Grid>
            </Container>

        </div>
    )
}
