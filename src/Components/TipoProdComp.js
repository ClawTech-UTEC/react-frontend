import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = 'http://localhost:8081/api/tipoProdSelectuctos/';
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));
function TipoProdSelectComp(){
    const styles = useStyles();
    const [data, setData] = useState([])
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
     const [modalInsertar, setModalInsertar]=useState(false);
    const [search, setSearch] = useState("")
    const [tipoProdSelect, setTipoProdSelectSelect]=useState({
        
        codigoDeBarras: '',
        nombre: '',
        categoria: '',
        subCat: '',
        descripcion: '',
        precio: '',
        neto: '',
       
    })

    const handleChange=e=>{
        const {name, value}=e.target;
        setTipoProdSelectSelect(prevState=>({
          ...prevState,
          [name]: value
        }))
        console.log(tipoProdSelect);
      }
  
    const peticionGet = async () => {
        await axios.get(url)
          .then(response => {
            setData(response.data);
          })
      }
      const peticionPost=async()=>{
        await axios.post(url, tipoProdSelect)
        .then(response=>{
          setData(data.concat(response.data))
          abrirCerrarModalInsertar()
        })
      }
      const peticionPut=async()=>{
        await axios.put(url+tipoProdSelect.idTipoProd, tipoProdSelect)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(tipoProd=>{
            if(tipoProdSelect.idTipoProd===tipoProd.idTipoProd){
              tipoProd.codigoDeBarras=tipoProdSelect.codigoDeBarras;
              tipoProd.nombre=tipoProdSelect.nombre;
              tipoProd.categoria=tipoProdSelect.categoria;
              tipoProd.subCat=tipoProdSelect.subCat;
              tipoProd.descripcion=tipoProdSelect.descripcion;
              tipoProd.precio=tipoProdSelect.precio;
              tipoProd.neto=tipoProdSelect.neto;
              
             
            }
          })
          setData(dataNueva);
          abrirCerrarModalEditar();
        })
      }
    
      const peticionDelete=async()=>{
        await axios.delete(url+tipoProdSelect.idTipoProd)
        .then(response=>{
          setData(data.filter(tipoProd=>tipoProd.idTipoProd!==tipoProdSelect.idTipoProd));
          abrirCerrarModalEliminar();
        })
      }
    
      const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
      }
    
      const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
      }
    
      const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
      }
    
      const seleccionartipoProd=(tipoProd, caso)=>{
        setTipoProdSelectSelect(tipoProd);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
      }
      const searcher =(e)=>{
        setSearch(e.target.value);
        console.log(e.target.value)
      }
  
      const results = !search ? data : data.filter((tipoProd)=> tipoProd.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
    

}
