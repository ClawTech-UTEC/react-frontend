import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { apiBaseUrl } from '../constants/constants';

const url = apiBaseUrl + '/subCat/';
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

function CreateSubCatComp(){
  const styles = useStyles();
  const [data, setData] = useState([])
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
   const [modalInsertar, setModalInsertar]=useState(false);
  const [search, setSearch] = useState("")
  const [subCatSelect, setsubCatSeleccionado]=useState({
      
      nombre: '',
     
  })
  const handleChange=e=>{
      const {name, value}=e.target;
      setsubCatSeleccionado(prevState=>({
        ...prevState,
        [name]: value
      }))
      console.log(subCatSelect);
    }

  const peticionGet = async () => {
      await axios.get(url)
        .then(response => {
          setData(response.data);
        })
    }
    const peticionPost=async()=>{
      await axios.post(url, subCatSelect)
      .then(response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
    }
  
    const peticionPut=async()=>{
      await axios.put(url+subCatSelect.idSubCat, subCatSelect)
      .then(response=>{
        var dataNueva=data;
        dataNueva.map(subCat=>{
          if(subCatSelect.idSubCat===subCat.idSubCat){
            subCat.nombre=subCatSelect.nombre;
           
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
    }
  
    const peticionDelete=async()=>{
      await axios.delete(url+subCatSelect.idSubCat)
      .then(response=>{
        setData(data.filter(subCat=>subCat.idSubCat!==subCatSelect.idSubCat));
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
  
    const seleccionarsubCat=(subCat, caso)=>{
      setsubCatSeleccionado(subCat);
      (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }
    const searcher =(e)=>{
      setSearch(e.target.value);
      console.log(e.target.value)
    }

    const results = !search ? data : data.filter((subCat)=> subCat.nombre.toLowerCase().includes(search.toLocaleLowerCase()));
  
  
  
    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo subCateedor</h3>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
       
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )
  
    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar subCateedor</h3>
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={subCatSelect && subCatSelect.nombre}/>
      
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
          <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </div>
    )
  
    const bodyEliminar=(
      <div className={styles.modal}>
        <p>Estás seguro que deseas eliminar el subCat <b>{subCatSelect && subCatSelect.nombre}</b> ? </p>
        <div align="right">
          <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
          <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
  
        </div>
  
      </div>
    )


    useEffect( () => {
   peticionGet();
    }, [])

    return(
      <div className="App">
     <div className="caja1">
              <h2 className='titulo2'>Lista de subCateedores</h2>
              <div className='buscador'>
                  <input value={search} type="text" onChange={searcher} placeholder='buscar por nombre' className='form-control' />
              </div>
              <br />
              <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Agregar subCateedor</button>

              <table className='table table-striped table-hover mt-5 shadow-lg'>
                  <thead>
                      <tr className='bg-curso text-white' >

                          <th>idsubCat</th>
                          <th>nombre</th>
                         
                          <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                      {results.map(subCat => {
                          return (
                              <tr key={subCat.idSubCat}>
                                  <td>{subCat.idSubCat}</td>
                                  <td>{subCat.nombre}</td>
                                 
                                  <td>
                                      <button className="btn btn-primary" onClick={()=>seleccionarsubCat(subCat, 'Editar')}><FontAwesomeIcon icon={faEdit} /></button>
                                      {"   "}
                                      <button className="btn btn-danger" onClick={()=>seleccionarsubCat(subCat, 'Eliminar')}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                  </td>
                              </tr>
                          )
                      })}
                  </tbody>
              </table>
              <Modal
   open={modalInsertar}
   onClose={abrirCerrarModalInsertar}>
      {bodyInsertar}
   </Modal>

   <Modal
   open={modalEditar}
   onClose={abrirCerrarModalEditar}>
      {bodyEditar}
   </Modal>

   <Modal
   open={modalEliminar}
   onClose={abrirCerrarModalEliminar}>
      {bodyEliminar}
   </Modal>

      
          </div>


  </div>
);
    
}

export default CreateSubCatComp;