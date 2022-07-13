import { Box, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { pedidosService } from '../Servicios/PedidosService';
import recepcionService from '../Servicios/RecepcionService';
import tipoProductoService from '../Servicios/TipoProductoService';
function Principal() {

    const [reporteAnualPedidos, setReportePedidos] = useState(null);
    const [reporteAnualRecepcion, setReporteRecepcion] = useState(null);
    const [reporteProductosMasVendidos, setReporteProductosMasVendidos] = useState([]);

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




        return () => { ignore = true; }




    }, []);

    const dateFormatter = (item) => moment(`${item}-01-2022`).format("MMM YY");

    const cargarReportePedidos = (reporte) => {
        setReportePedidos(reporte)
    }
    const cargarReporteRecepcion = (reporte) => {
        setReporteRecepcion(reporte)
    }
    const cargarReporteProductosMasVendidos = (reporte) => {
        setReporteProductosMasVendidos(reporte)
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





    return (
        <div className='background'>
            <Grid container spacing={2}>
                <Grid item xs={6}>

                    <Card variant="outlined" >
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Reporte Productos Vendidos 2022
                            </Typography>
                            <ResponsiveContainer width={600} height={300}>
                                <LineChart width={400} height={300}
                                    tickFormatter={dateFormatter}
                                    data={reporteAnualPedidos}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <Legend />

                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="cantidad" stroke="#ff7300" yAxisId={0} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>

                    </Card >
                </Grid>
                <Grid item xs={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Reporte Productos Solicitados 2022
                            </Typography>
                            <ResponsiveContainer width={600} height={300}>
                                <LineChart width={400} height={300}
                                    data={reporteAnualRecepcion}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend displayName={"Cantidad Productos Solicitados Por mes"} />

                                    <CartesianGrid stroke="#f5f5f5" />
                                    <Line type="monotone" dataKey="cantidad" stroke="#ff7300" yAxisId={0} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>

                    </Card >
                </Grid>


                <Grid item xs={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Productos Mas Vendidos 2022
                            </Typography>

                            <table sx={{ minWidth: 650 }} className='table table-striped table-hover mt-5 shadow-lg'>
                                <thead className="tableHead">
                                    <tr>
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

                <Grid item xs={6}>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} gutterBottom>
                                Proyeccion Facturacion Proximos 6 Meses
                            </Typography>
                            <ResponsiveContainer width={600} height={300}>
                                <LineChart width={400} height={300} 
                                    tickFormatter={dateFormatter}
                                    data={prediccion}
                                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                                >
                                    <Legend />

                                    <XAxis dataKey="mes" tickFormatter={dateFormatter} />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="facturacion" stroke="#ff7300" yAxisId={0} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>

                    </Card >
                </Grid>

            </Grid>



        </div>
    );

}

export default Principal;