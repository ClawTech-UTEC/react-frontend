import { Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { pedidosService } from '../Servicios/PedidosService';
import moment from 'moment';

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
                    <Link to="/crearPedido">
                        <Button variant="contained" color="primary" align="center">Crear Nuevo Pedido</Button>
                    </Link>

                </Grid>
                <Grid item xs={12}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id Pedido</TableCell>
                                    <TableCell align="center">Cliente</TableCell>
                                    <TableCell align="center">Estado Pedido</TableCell>
                                    <TableCell align="center">Creado Por</TableCell>
                                    <TableCell align="center">Fecha Pedido</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPedidos.map((pedido) => (
                                    <TableRow
                                        onClick={() => navigate('/detallePedido', {
                                            state: pedido // your data array of objects
                                        })}

                                        key={pedido.idPedido}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <TableCell align="center">{pedido.idPedido}</TableCell>
                                        <TableCell align="center">{pedido.cliente.nombre}</TableCell>
                                        <TableCell align="center">{pedido.estadoPedido[pedido.estadoPedido.length - 1].tipoEstadoPedido}</TableCell>
                                        <TableCell align="center">{pedido.estadoPedido[0].usuario.nombre}</TableCell>
                                        <TableCell align="center">{moment(new Date(pedido.fechaPedido)).format('D/M/YY')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>

        </div>
    )
}
