import logo from './logo.svg';
import './App.css';

import HeaderComp from './Components/HeaderComp';
import FooterComp from './Components/FooterComp';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Principal from './Components/Principal';

import NavBar from './Components/NavBar';

import CreateProvComp from './Components/CreateProvComp';
import { Create } from '@material-ui/icons';
import CreateSubCatComp from './Components/CreateSubCatComp';
import CreateCategoriaComp from './Components/CreateCategoriaComp';
import RecepcionesTable from './Components/RecepcionesTable';
import CreateRecepcion from './Components/CreateRecepcion';
import Login from './Components/Login';
import { useJwt } from "react-jwt";
import DetalleRecepcion from './Components/DetalleRecepcion';

import TipoProdComp from './Components/TipoProdComp';

import ControlarRecepcion from './Components/ControlarRecepcion';
import PedidosTable from './Components/PedidosTable';
import CrearPedido from './Components/CrearPedido';
import StockTable from './Components/TablaStock';
import DetallePedido from './Components/DetallePedido';
import PrepararPedido from './Components/PrepararPedido';
import ControlarPedido from './Components/ControlarPedido';
import DespacharPedido from './Components/DespacharPedido';
import EntregarPedido from './Components/EntregarPedido';
import DevolverPedido from './Components/DevolverPedido';
import Deposito from './Components/Deposito';



function App() {


  const { decodedToken, isExpired } = useJwt(localStorage.getItem('jwt'));

  return (
    <BrowserRouter>
      {isExpired ? <div /> : <NavBar />}
      <Routes>
        <Route path="/" element={isExpired ? <Login /> : <Principal />}></Route>
        <Route path="/add-subcat" element={<CreateSubCatComp />}></Route>
        <Route path="/add-prov" element={<CreateProvComp />}></Route>
        <Route path="/add-cat" element={<CreateCategoriaComp />}></Route>
        <Route path="/recepciones" element={<RecepcionesTable />}></Route>
        <Route path="/add-tipoProd" element={<TipoProdComp />}></Route>
        <Route path="/crearRecepcion" element={<CreateRecepcion />}></Route>
        <Route path="/detalleRecepcion" element={<DetalleRecepcion />}></Route>
        <Route path="/controlarRecepcion" element={<ControlarRecepcion />}></Route>
        <Route path="/pedidos" element={<PedidosTable />}></Route>
        <Route path="/crearPedido" element={<CrearPedido />}></Route>
        <Route path="/detallePedido" element={<DetallePedido />}></Route>
        <Route path="/prepararPedido" element={<PrepararPedido />}></Route>
        <Route path="/controlarPedido" element={<ControlarPedido />}></Route>
        <Route path="/despacharPedido" element={<DespacharPedido />}></Route>
        <Route path="/entregarPedido" element={<EntregarPedido />}></Route>
        <Route path="/devolverPedido" element={<DevolverPedido />}></Route>
        <Route path="/stock" element={<StockTable />}></Route>
        <Route path="/deposito" element={<Deposito />}></Route>

      </Routes>



    </BrowserRouter>
  );
}

export default App;
