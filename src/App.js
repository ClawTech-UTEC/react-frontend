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


function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Principal />}></Route>

        <Route path="/add-subcat" element={<CreateSubCatComp />}></Route>
        <Route path="/add-prov" element={<CreateProvComp />}></Route>
        <Route path="/add-cat" element={<CreateCategoriaComp />}></Route>
        <Route path="/recepciones" element={<RecepcionesTable />}></Route>


      </Routes>



    </BrowserRouter>
  );
}

export default App;
