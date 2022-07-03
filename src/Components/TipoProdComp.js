import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = 'http://localhost:8081/api/tipoProductos/';
const url2 = 'http://localhost:8081/api/categoria/';
const url3 = 'http://localhost:8081/api/subCat/';

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
function TipoProdComp() {
  const styles = useStyles();
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [text, setText] = useState('')
  const [text2, setText2] = useState('')
  const [suggestions, setSeuggestions] = useState([])
  const [suggestions2, setSeuggestions2] = useState([])
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [search, setSearch] = useState("")
  const [tipoProdSelect, setTipoProdSelectSelect] = useState({

    codigoDeBarras: '',
    nombre: '',
    categoria: '',
    subCat: '',
    descripcion: '',
    precio: '',
    neto: '',

  })

  const handleChange = e => {
    const { name, value } = e.target;
    setTipoProdSelectSelect(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(tipoProdSelect);
  }

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = data2.filter(dt2 => {
        const regex = new RegExp(`${text}`, 'gi');
        return dt2.nombre.match(regex)
      })
    }
    console.log('matches', matches)
    setSeuggestions(matches)
    setText(text)
  }

  const onSuggestHandler = (text) => {

    setText(text);
    setSeuggestions([]);


  }
  const onChangeHandler2 = (text2) => {
    let matches2 = []
    if (text2.length > 0) {
      matches2 = data3.filter(dt3 => {
        const regex = new RegExp(`${text2}`, 'gi');
        return dt3.nombre.match(regex)
      })
    }
    console.log('matches2', matches2)
    setSeuggestions2(matches2)
    setText2(text2)
  }
  const onSuggestHandler2 = (text2) => {

    setText2(text2);
    setSeuggestions2([]);


  }

  const peticionGet = async () => {
    await axios.get(url)
      .then(response => {
        setData(response.data);
      })
  }
  const peticionGet2 = async () => {
    await axios.get(url2)
      .then(response => {
        setData2(response.data);

      })
  }
  const peticionGet3 = async () => {
    await axios.get(url3)
      .then(response => {
        setData3(response.data);

      })
  }
  const peticionPost = async () => {
    await axios.post(url, tipoProdSelect)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }
  const peticionPut = async () => {
    await axios.put(url + tipoProdSelect.idTipoProd, tipoProdSelect)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(tipoProd => {
          if (tipoProdSelect.idTipoProd === tipoProd.idTipoProd) {
            tipoProd.codigoDeBarras = tipoProdSelect.codigoDeBarras;
            tipoProd.nombre = tipoProdSelect.nombre;
            tipoProd.categoria = tipoProdSelect.categoria;
            tipoProd.subCat = tipoProdSelect.subCat;
            tipoProd.descripcion = tipoProdSelect.descripcion;
            tipoProd.precio = tipoProdSelect.precio;
            tipoProd.neto = tipoProdSelect.neto;


          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(url + tipoProdSelect.idTipoProd)
      .then(response => {
        setData(data.filter(tipoProd => tipoProd.idTipoProd !== tipoProdSelect.idTipoProd));
        abrirCerrarModalEliminar();
      })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionartipoProd = (tipoProd, caso) => {
    setTipoProdSelectSelect(tipoProd);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const results = !search ? data : data.filter((tipoProd) => tipoProd.nombre.toLowerCase().includes(search.toLocaleLowerCase()));


  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo tipoProd</h3>
      <TextField name="codigoDeBarras" className={styles.inputMaterial} label="codigoDeBarras" onChange={handleChange} />

      <br></br>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
      <br></br>

      <TextField className={styles.inputMaterial} label="categoria" onChange={e => onChangeHandler(e.target.value)} value={text}
      />
      <br></br>
      {suggestions && suggestions.map((suggestions, i) =>
        <div key={i} className="suggestion col-md-12 justify-content-md-center"
          onClick={() => onSuggestHandler(suggestions.nombre)}
        >{suggestions.nombre}</div>
      )}


      <TextField className={styles.inputMaterial} label="subCat" onChange={e => onChangeHandler2(e.target.value)} value={text2}
      />
      <br></br>
      {suggestions2 && suggestions2.map((suggestions2, i) =>
        <div key={i} className="suggestion col-md-12 justify-content-md-center"
          onClick={() => onSuggestHandler2(suggestions2.nombre)}
        >{suggestions2.nombre}</div>
      )}

      <TextField name="descripcion" className={styles.inputMaterial} label="Descripcion" onChange={handleChange} />
      <br></br>

      <TextField name="precio" className={styles.inputMaterial} label="Precio" onChange={handleChange} />
      <br></br>

      <TextField name="neto" className={styles.inputMaterial} label="Neto" onChange={handleChange} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar cateedor</h3>
      <TextField name="codigoDeBarras" className={styles.inputMaterial} label="codigoDeBarras" onChange={handleChange} value={tipoProdSelect && tipoProdSelect.codigoDeBarras} />
      <br></br>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el cat <b>{tipoProdSelect && tipoProdSelect.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  useEffect(() => {
    peticionGet();
    peticionGet2();
    peticionGet3();
  }, [])
  return (
    <div className="App">
      <div className="caja1">
        {/* <h2 className='titulo2'>Lista de tipoProds</h2>
        <div className='buscador'>
          <input value={search} type="text" onChange={searcher} placeholder='buscar por nombre' className='form-control' />
        </div>
        <br />
        <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Agregar tipoProd</button>

        <table className='table table-striped table-hover mt-5 shadow-lg'>
          <thead>
            <tr className='bg-curso text-white' >

              <th>idTipoProd</th>
              <th>codigoDeBarras</th>
              <th>nombre</th>
              <th>categoria</th>
              <th>subcategoria</th>
              <th>descripcion</th>
              <th>precio</th>
              <th>neto</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map(tipoProd => {
              return (
                <tr key={tipoProd.idTipoProd}>
                  <td>{tipoProd.idTipoProd}</td>
                  <td>{tipoProd.codigoDeBarras}</td>
                  <td>{tipoProd.nombre}</td>
                  <td>{tipoProd.categoria}</td>
                  <td>{tipoProd.subCat}</td>
                  <td>{tipoProd.descripcion}</td>
                  <td>{tipoProd.precio}</td>
                  <td>{tipoProd.neto}</td>

                  <td>
                    <button className="btn btn-primary" onClick={() => seleccionartipoProd(tipoProd, 'Editar')}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => seleccionartipoProd(tipoProd, 'Eliminar')}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
 */}

      </div>


    </div>
  );
}

export default TipoProdComp;


