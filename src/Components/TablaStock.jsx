import { Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { stockService } from '../Servicios/StockService';

export default function StockTable() {

    const [productos, setproductos] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const navigate = useNavigate();
    const [searched, setSearched] = useState("");
    useEffect(() => {
        let ignore = false;
        stockService.getProductos().then(response => {
            console.log(response.data);
            cargarProductos(response.data);
        });
        return () => { ignore = true; }
    }, []);

    const cargarProductos = (productos) => {
        setproductos(productos)
        setFilteredProductos(productos)
    }


    const requestSearch = (searchedVal) => {
        const filteredRows = productos.filter((producto) => {
            return producto.idProd.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
                producto.tipoProducto.codigoDeBarras.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
                producto.tipoProducto.nombre.toString().toLowerCase().includes(searchedVal.toLowerCase())
                ;
        });
        console.log(searchedVal);
        setFilteredProductos(filteredRows);
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
                   

                </Grid>
                <Grid item xs={12}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id Producto</TableCell>
                                    <TableCell align="center">Nombre Producto</TableCell>
                                    <TableCell align="center">Codigo de Barras</TableCell>
                                    <TableCell align="center">Cantidad Disponible</TableCell>
                                    <TableCell align="center">Cantidad Reservada</TableCell>
                                    <TableCell align="center">Cantidad En Cuarentena</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProductos.map((producto) => (
                                    <TableRow
                                      

                                        key={producto.idproducto}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <TableCell align="center">{producto.idProd}</TableCell>
                                        <TableCell align="center">{producto.tipoProducto.nombre}</TableCell>
                                        <TableCell align="center">{producto.tipoProducto.codigoDeBarras}</TableCell>
                                        <TableCell align="center">{producto.cantidadDisponible}</TableCell>
                                        <TableCell align="center">{producto.cantidadReservada}</TableCell>
                                        <TableCell align="center">{producto.cantidadEnCuarentena}</TableCell>

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
