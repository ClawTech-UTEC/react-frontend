import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = 'http://localhost:8081/api/prov/';
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

function CreateProvComp(){
    const styles = useStyles();
    const [data, setData] = useState([])
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
     const [modalInsertar, setModalInsertar]=useState(false);
    const [search, setSearch] = useState("")
    const [provSeleccionado, setprovSeleccionado]=useState({
        
        nombreProv: '',
        contacto: '',
        email: ''
    })
    const handleChange=e=>{
        const {name, value}=e.target;
        setprovSeleccionado(prevState=>({
          ...prevState,
          [name]: value
        }))
        console.log(provSeleccionado);
      }

    const peticionGet = async () => {
        await axios.get(url)
          .then(response => {
            setData(response.data);
          })
      }
      const peticionPost=async()=>{
        await axios.post(url, provSeleccionado)
        .then(response=>{
          setData(data.concat(response.data))
          abrirCerrarModalInsertar()
        })
      }
    
      const peticionPut=async()=>{
        await axios.put(url+provSeleccionado.idProv, provSeleccionado)
        .then(response=>{
          var dataNueva=data;
          dataNueva.map(prov=>{
            if(provSeleccionado.idProv===prov.idProv){
              prov.nombreProv=provSeleccionado.nombreProv;
             
              prov.contacto=provSeleccionado.contacto;
              prov.email=provSeleccionado.email;
            }
          })
          setData(dataNueva);
          abrirCerrarModalEditar();
        })
      }
    
      const peticionDelete=async()=>{
        await axios.delete(url+provSeleccionado.idProv)
        .then(response=>{
          setData(data.filter(prov=>prov.idProv!==provSeleccionado.idProv));
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
    
      const seleccionarProv=(prov, caso)=>{
        setprovSeleccionado(prov);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
      }
      const searcher =(e)=>{
        setSearch(e.target.value);
        console.log(e.target.value)
      }

      const results = !search ? data : data.filter((prov)=> prov.nombreProv.toLowerCase().includes(search.toLocaleLowerCase()));
    
    
    
      const bodyInsertar=(
        <div className={styles.modal}>
          <h3>Agregar Nuevo Proveedor</h3>
          <TextField name="nombreProv" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
          <br />
          
          <TextField name="contacto" className={styles.inputMaterial} label="contacto" onChange={handleChange}/>
          <br />
          <TextField name="email" className={styles.inputMaterial} label="email" onChange={handleChange}/>
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
            <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
          </div>
        </div>
      )
    
      const bodyEditar=(
        <div className={styles.modal}>
          <h3>Editar Proveedor</h3>
          <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={provSeleccionado && provSeleccionado.nombreProv}/>
          <br />
          <TextField name="contacto" className={styles.inputMaterial} label="Contacto" onChange={handleChange} value={provSeleccionado && provSeleccionado.contacto}/>
          <br />
          <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={provSeleccionado && provSeleccionado.email}/>
         
          <br /><br />
          <div align="right">
            <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
            <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
          </div>
        </div>
      )
    
      const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el prov <b>{provSeleccionado && provSeleccionado.nombreProv}</b> ? </p>
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
                <h2 className='titulo2'>Lista de Proveedores</h2>
                <div className='buscador'>
                    <input value={search} type="text" onChange={searcher} placeholder='buscar por nombreProv' className='form-control' />
                </div>
                <br />
                <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}>Agregar Proveedor</button>

                <table className='table table-striped table-hover mt-5 shadow-lg'>
                    <thead>
                        <tr className='bg-curso text-white' >

                            <th>idProv</th>
                            <th>nombreProv</th>
                            <th>contacto</th>
                            <th>e-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map(prov => {
                            return (
                                <tr key={prov.idProv}>
                                    <td>{prov.idProv}</td>
                                    <td>{prov.nombreProv}</td>
                                    <td>{prov.contacto}</td>
                                    <td>{prov.email}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={()=>seleccionarProv(prov, 'Editar')}><FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={()=>seleccionarProv(prov, 'Eliminar')}><FontAwesomeIcon icon={faTrashAlt} /></button>
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

export default CreateProvComp;
