import { Grid, Paper, Button, table, tbody, th, tableContainer, tableHead, thead, Container } from '@material-ui/core';
import SearchBar from 'material-ui-search-bar';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { stockService } from '../Servicios/StockService';
import { withStyles } from '@mui/material';

export default function Stocktable() {

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
        <div >
            <Container maxWidth="md">
              
           
            <Grid container spacing={3}>
                <Grid item xs={12}>
                        <h2 className='titulo2'>Stock de productos</h2>

                        <SearchBar className='searchbar'
                        value={searched} placeholder="Buscar"
                        onChange={(searchVal) => requestSearch(searchVal)}
                        onCancelSearch={() => cancelSearch()}
                    />
                </Grid>
                <Grid item xs={3}>
                   

                </Grid>
                <Grid item xs={12}>

                        <table sx={{ minWidth: 650 }} className='table table-striped table-hover mt-5 shadow-lg'>
                                <thead className="tableHead">
                                <tr className='bg-curso text-white' >
                                    <th align="center">Id Producto</th>
                                    <th align="center">Nombre Producto</th>
                                    <th align="center">Codigo de Barras</th>
                                    <th align="center">Cantidad Disponible</th>
                                    <th align="center">Cantidad Reservada</th>
                                    {/* <th align="center">Cantidad En Cuarentena</th> */}

                                    </tr>
                                </thead>
                            <tbody>
                                {filteredProductos.map((producto) => (
                                    <tr
                                      

                                        key={producto.idproducto}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <th align="center">{producto.idProd}</th>
                                        <th align="center">{producto.tipoProducto.nombre}</th>
                                        <th align="center">{producto.tipoProducto.codigoDeBarras}</th>
                                        <th align="center">{producto.cantidadDisponible}</th>
                                        <th align="center">{producto.cantidadReservada}</th>
                                        {/* <th align="center">{producto.cantidadEnCuarentena}</th> */}

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
