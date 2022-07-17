import { Box, Card, CardActions, CardContent, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { categoriaService } from '../Servicios/CategoriasService';

import { pedidosService } from '../Servicios/PedidosService';
import recepcionService from '../Servicios/RecepcionService';
import tipoProductoService from '../Servicios/TipoProductoService';
function Principal() {

    const [reporteAnualPedidos, setReportePedidos] = useState(null);
    const [reporteAnualRecepcion, setReporteRecepcion] = useState(null);
    const [reporteProductosMasVendidos, setReporteProductosMasVendidos] = useState([]);
    const [reporteCategorias, setReporteCategorias] = useState([]);
    const [categoria, setcategoria] = useState([]);
    const [categoriaSeleccionadaVendidos, setcategoriaSeleccionadaVendidos] = useState(null);
    const [categoriaSeleccionadaCompras, setcategoriaSeleccionadaCompras] = useState(null);
    useEffect(() => {
        let ignore = false;

        pedidosService.getReportePedidoAnual(2022).then(response => {

            cargarReportePedidos(response.data);

        });

        recepcionService.getReporteRecepcionesAnual(2022).then(response => {

            cargarReporteRecepcion(response.data);
        });

        tipoProductoService.getProductosMasVendidos(2022).then(response => {
            cargarReporteProductosMasVendidos(response.data);
        });

        categoriaService.getReporteVentasCategorias(2022).then(response => {
            cargarReporteCategorias(response.data);
            console.log(response.data);
        })

        categoriaService.getCategorias().then(response => { cargarCategorias(response.data); })

        return () => { ignore = true; }




    }, []);

    const dateFormatter = (item) => moment(`${item}-01-2022`).format("MMM YY");

    const cargarReportePedidos = (reporte) => {
        console.log(reporte);
        setReportePedidos(reporte)
    }
    const cargarReporteRecepcion = (reporte) => {
        setReporteRecepcion(reporte)
    }
    const cargarReporteProductosMasVendidos = (reporte) => {
        setReporteProductosMasVendidos(reporte)
    }

    const cargarReporteCategorias = (reporte) => {
        setReporteCategorias(reporte)
    }

    const cargarCategorias = (reporte) => {
        reporte.push({ id: 0, nombre: 'TOTALES' })
        setcategoria(reporte);
    }

    function TableRow(prop) {
        return (
            <tr >
                <th>{prop.idTipoProd}</th>
                <th>{prop.nombre}</th>
                <th>{prop.cantidad}</th>
            </tr>
        )
    }

    const prediccion = [
        {
            mes: 7,
            facturacion: 33769
        },
        {
            mes: 8,
            facturacion: 29059

        }, {
            mes: 9,
            facturacion: 35788

        }, {
            mes: 10,
            facturacion: 25640

        }, {
            mes: 11,
            facturacion: 32769

        }, {
            mes: 12,
            facturacion: 36769

        },
    ]


    const onChangeCategoriaVentas = (event, value) => {
        console.log(value);

        if (value.nombre == "TOTALES") {
            pedidosService.getReportePedidoAnual(2022).then(response => {

                cargarReportePedidos(response.data);

            });
            return;
        }
        setcategoriaSeleccionadaVendidos(value);
        categoriaService.getReporteVentasCategorias(value.idCat, 2022).then(response => { console.log(response.data); cargarReportePedidos(response.data); })
    }

    const onChangeCategoriaCompras = (event, value) => {
        console.log(value);

        if (value.nombre === "TOTALES") {
            recepcionService.getReporteRecepcionesAnual(2022).then(response => {

                cargarReporteRecepcion(response.data);

            });
            return;
        }
        setcategoriaSeleccionadaCompras(value);
        categoriaService.getReporteComprasCategorias(value.idCat, 2022).then(response => { console.log(response.data); cargarReporteRecepcion(response.data); })
    }


    return (
        <div className='background'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >

                    <Card variant="outlined" >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Reporte Productos Vendidos 2022
                            </Typography>


                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    tickFormatter={dateFormatter}
                                    data={reporteAnualPedidos}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <Legend />

                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Tooltip />
                                    <Area
                                        name="Cantidad de productos Vendidos Por Mes"
                                        type="monotone" dataKey="cantidad" fill="#0d6efd" yAxisId={0} />
                                </AreaChart>
                            </ResponsiveContainer>

                            <Autocomplete
                                options={categoria}
                                onChange={onChangeCategoriaVentas}
                                value={categoriaSeleccionadaVendidos}

                                getOptionLabel={(option) => option.nombre || ""}
                                renderInput={(params) => <TextField {...params} label="Buscar Por categoria" />}
                            />
                        </CardContent>

                    </Card >

                </Grid>
                <Grid item xs={12} md={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Reporte Productos Solicitados 2022
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    data={reporteAnualRecepcion}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend displayName={"Cantidad Productos Solicitados Por mes"} />

                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Area name="Cantidad Productos Solicitados Por mes"
                                        type="monotone"
                                        dataKey="cantidad" fill="#0d6efd" yAxisId={0} />
                                </AreaChart>
                            </ResponsiveContainer>

                            <Autocomplete
                                options={categoria}
                                onChange={onChangeCategoriaCompras}
                                value={categoriaSeleccionadaCompras}

                                getOptionLabel={(option) => option.nombre || ""}
                                renderInput={(params) => <TextField {...params} label="Buscar Por categoria" />}
                            />
                        </CardContent>

                    </Card >
                </Grid>

                <Grid item xs={12} md={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Productos Mas Vendidos 2022
                            </Typography>

                            <table sx={{ minWidth: 650 }} className='table table-striped table-hover mt-5 shadow-lg'>
                                <thead className="tableHead">
                                    <tr className='bg-curso text-white' >
                                        <th align="center">Id </th>
                                        <th align="center">Nombre</th>
                                        <th align="center">Cantidad Vendida</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {reporteProductosMasVendidos.map((item) => (
                                        <tr

                                            key={item.idTipoProd}
                                            sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                        >
                                            <th>{item.idTipoProd}</th>

                                            <th>{item.nombre}</th>
                                            <th>{item.cantidad}</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </CardContent>

                    </Card >


                </Grid>

                <Grid item xs={12} md={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Proyeccion Facturacion Proximos 6 Meses
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart
                                    tickFormatter={dateFormatter}
                                    data={prediccion}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <Legend />

                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Area
                                        name = "Facturacion total Mensual"
                                    type="monotone" dataKey="facturacion" fill="#0d6efd" yAxisId={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>

                    </Card >
                </Grid>

            </Grid>



        </div>
    );

}

export default Principal;