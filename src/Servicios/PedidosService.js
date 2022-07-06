import axios from 'axios';
import { apiBaseUrl } from '../constants/constants';

const pedidosService = {

    getPedidos: () => {
        return axios.get(apiBaseUrl + '/pedidos');
    },

    createPedido(pedido) {
        return axios.post(apiBaseUrl + '/pedidos', pedido, {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        }).then(response => response);;
    },

    prepararPedido: (idPedido, idUsuaurio) => {
        return axios.put(`${apiBaseUrl}/pedidos/preparar/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }
        );
    },

    controlarPedido: (idPedido, idUsuaurio) => {
        return axios.put(

            `${apiBaseUrl}/pedidos/controlar/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
        );
    },

    despacharPedido: (
        {idPedido, idUsuaurio, idDistribuidor}) => {
        return axios.put(
            `${apiBaseUrl}/pedidos/despachar/${idPedido}/?idUsuario=${idUsuaurio}&idDistribuidor=${idDistribuidor}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
        );
    },

    entregarPedido: ({idPedido, idUsuaurio}) => {
        return axios.put(

            `${apiBaseUrl}/pedidos/entregar/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        );


    },


    devolverPedido: ({idPedido, idUsuaurio}) => {
        return axios.put(

            `${apiBaseUrl}/pedidos/devolver/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        );
    },



    cancelarPedido: (idPedido, idUsuaurio) => {
        return axios.post(
            `${apiBaseUrl}/pedidos/cancelar/${idPedido}/?idUsuario=${idUsuaurio}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }
        );
    },

    getReportePedidoAnual: (year) =>
        axios.get(`${apiBaseUrl}/pedidos/reporte/${year}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            },
        ).then(response => response),




    getReporteProductoPedidoAnual: (
        year, idProducto) => {
        return axios.get(
            `${apiBaseUrl}/pedidos/reporte/${year}/?idProducto=${idProducto}`,
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }
        )
    },

    downloadRemitoPdf: (idPedido) => {
      return  axios.get(
            apiBaseUrl + `/etiquetas/pedido/${idPedido}`,
            { responseType: 'blob' } 
        ).then((response) => {
            window.open(URL.createObjectURL(response.data));
        })
    }

  



}

export { pedidosService }