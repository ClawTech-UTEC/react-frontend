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
        <Route path="/crearRecepcion" element={<CreateRecepcion />}></Route>
        <Route path="/detalleRecepcion" element={<DetalleRecepcion />}></Route>



      </Routes>



    </BrowserRouter>
  );
}

export default App;
