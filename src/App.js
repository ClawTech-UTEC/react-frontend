import logo from './logo.svg';
import './App.css';
import ListProvsComponents from './Components/ListProvComp';
import HeaderComp from './Components/HeaderComp';
import FooterComp from './Components/FooterComp';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProvComp from './Components/CreateProvComp';
import ProvUpdate from './Components/ProvUpdate';
import ListSubCatComponent from './Components/ListSubCatComponent';
import Principal from './Components/Principal';
import ListProvComp from './Components/ListProvComp';

function App() {
  return (
    <BrowserRouter>
  
    
     <Routes>
       <Route path="/" exact element={<Principal/>}></Route>
       <Route path="/list-prov" exact element={<ListProvComp/>}></Route>
       <Route path="/add-prov" element={<CreateProvComp/>}></Route>
       <Route path="/update-prov/:id" element={<ProvUpdate/>}></Route>
       <Route path="/listSubCat" element={<ListSubCatComponent/>}></Route>
       
     </Routes>
        
        

    </BrowserRouter>
  );
}

export default App;
