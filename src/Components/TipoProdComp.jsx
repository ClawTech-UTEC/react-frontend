import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBarcode } from '@fortawesome/free-solid-svg-icons';
import { apiBaseUrl } from "../constants/constants";
import { Col, Row } from 'reactstrap';
//import { Storage } from '@google-cloud/storage';

const apiTipoProductos = apiBaseUrl + "/tipoProductos/";
const apiCategoria = apiBaseUrl + "/categoria/";
const apiSubCategoria = apiBaseUrl + "/subCat/";
const apiProveedores = apiBaseUrl + "/prov";
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
    transform: 'translate(-50%, -50%)',
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));
//const storage = new Storage();

function TipoProdComp() {
  const styles = useStyles();
  const [tipoProducto, setTipoProducto] = useState([])
  const [categorias, setCategorias] = useState([])
  const [subCategorias, setSubCategorias] = useState([])
  const [proveedores, setProveedores] = useState([]);
  const [categoriaTxt, setCategoriaTxt] = useState('')
  const [subCategoriaTxt, setSubCategoriaTxt] = useState('')
  const [proveedorTxt, setproveedorTx] = useState('');
  const [suggestionsCategoria, setSeuggestionsCategoria] = useState([])
  const [suggestionsSubcategoria, setSeuggestionsSubcategoria] = useState([])
  const [suggestionsProveedor, setSeuggestionsProveedor] = useState([])
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalImprimir, setModalImprimir] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [search, setSearch] = useState("")
  const [foto, setfoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [tipoProdSelect, setTipoProdSelectSelect] = useState({

    codigoDeBarras: '',
    nombre: '',
    categoria: '',
    subCat: '',
    descripcion: '',
    precio: '',
    neto: '',
    imageUrl: '',

  })

  const handleChange = e => {
    const { name, value } = e.target;






    setTipoProdSelectSelect(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(tipoProdSelect);
  }

  const onChangeHandlerCategoria = (text) => {
    let matches = []
    if (text.length > 0) {
      matches = categorias.filter(dt2 => {
        const regex = new RegExp(`${text}`, 'gi');
        return dt2.nombre.match(regex)
      })


    }
    console.log('matches', matches)
    setSeuggestionsCategoria(matches)
    setCategoriaTxt(text)

  }

  const onSuggestHandlerCategoria = (text) => {

    setCategoriaTxt(text.nombre);
    setSeuggestionsCategoria([]);

    setTipoProdSelectSelect(prevState => ({
      ...prevState,
      ['categoria']: text
    }))
  }


  const onChangeHandlerSubCategoria = (text2) => {
    let matches2 = []
    console.log(subCategorias)
    if (text2.length > 0) {
      matches2 = subCategorias.filter(dt3 => {
        const regex = new RegExp(`${text2}`, 'gi');
        return dt3.nombre.match(regex)
      })


    }
    console.log('matches2', matches2)
    setSeuggestionsSubcategoria(matches2)
    setSubCategoriaTxt(text2)

  }
  const onSuggestHandlerSubCategoria = (text2) => {

    setSubCategoriaTxt(text2.nombre);
    setSeuggestionsSubcategoria([]);

    setTipoProdSelectSelect(prevState => ({
      ...prevState,
      ['subCat']: text2
    }))



  }
  const fotoPlaceholder = "https://storage.googleapis.com/clawtechpics/tipoProducto/no-image.png"

  const onChangeHandlerProveedor = (proveedorTxt) => {
    console.log(proveedores)

    let proveedoresSugeridos = []
    if (proveedorTxt.length > 0) {
      proveedoresSugeridos = proveedores.filter(proveedor => {
        const regex = new RegExp(`${proveedorTxt}`, 'gi');
        return proveedor.nombreProv.match(regex)
      })


    }
    console.log('matches2', proveedorTxt)
    setSeuggestionsProveedor(proveedoresSugeridos)
    setproveedorTx(proveedorTxt)

  }
  const onSuggestHandlerProveedor = (provText) => {

    setproveedorTx(provText.nombreProv);
    setSeuggestionsProveedor([]);
    setTipoProdSelectSelect(prevState => ({
      ...prevState,
      ['provedor']: provText
    }))



  }


  const onChangeFileHandler = (e) => {
    console.log(e)
    setFotoPreview(URL.createObjectURL(e.target.files[0]));

    console.log(e.target.files[0])
    setfoto(e.target.files[0])
  }




  const peticionGetTipoProuctos = async () => {
    await axios.get(apiTipoProductos, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        setTipoProducto(response.data);
      })
  }
  const peticionGetCategorias = async () => {
    await axios.get(apiCategoria, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        setCategorias(response.data);

      })
  }
  const peticionGetSubCategoria = async () => {
    await axios.get(apiSubCategoria, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        setSubCategorias(response.data);

      })
  }
  const peticionGetPrevedores = async () => {
    await axios.get(apiProveedores, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => {
        setProveedores(response.data);

      })
  }



  const peticionPost = async () => {

    if (tipoProdSelect.codigoDeBarras === "" || tipoProdSelect.nombre === "" || tipoProdSelect.categoria === "" || tipoProdSelect.subCat === "" || tipoProdSelect.descripcion === "" || tipoProdSelect.precio === "" || tipoProdSelect.neto === "" ) {
      console.log(tipoProdSelect)
     
     
     
      setErrorMessage("Todos los campos son obligatorios")
      return;
    }







    console.log(tipoProdSelect)
    const formData = new FormData();
    formData.append("image", foto);
    // formData.append("tipoProducto", tipoProdSelect);

    console.log(tipoProdSelect);

    let nombreUnicoImagen = tipoProdSelect.nombre + "_" + tipoProdSelect.provedor.nombreProv;
    nombreUnicoImagen = nombreUnicoImagen.replace(/ /g, "_").toLowerCase();

    await axios.post(apiTipoProductos + "image/" + nombreUnicoImagen,
      formData
    ).then(response => {
        axios.post(apiTipoProductos,
          { ...tipoProdSelect, ['imageUrl']: response.data }
        )
          .then(response => {
            setTipoProducto(tipoProducto.concat(response.data))
            abrirCerrarModalInsertar()
          }).catch(error => {

            alert("Error al insertar el tipo de producto")
          })
      
    })





  }



  const peticionPut = async () => {
    await axios.put(apiTipoProductos + tipoProdSelect.idTipoProd, tipoProdSelect)
      .then(response => {
        var dataNueva = tipoProducto;
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
        setTipoProducto(dataNueva);
        abrirCerrarModalEditar();
      })
  }





  const peticionDelete = async () => {
    await axios.delete(apiTipoProductos + tipoProdSelect.idTipoProd)
      .then(response => {
        setTipoProducto(tipoProducto.filter(tipoProd => tipoProd.idTipoProd !== tipoProdSelect.idTipoProd));
        abrirCerrarModalEliminar();
      })
  }

  const abrirCerrarModalInsertar = () => {
    setErrorMessage("");
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalImprimir = () => {
    setModalImprimir(!modalImprimir);
  }

  const seleccionartipoProd = (tipoProd, caso) => {
    setTipoProdSelectSelect(tipoProd);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }
  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const onImprimir = (tipoProd) => {
    setTipoProdSelectSelect(tipoProd);
    abrirCerrarModalImprimir();

  }


  const imprimirEtiquetas = () => {


    return axios.get(
      apiBaseUrl + `/etiquetas/tipoProducto/${tipoProdSelect.idTipoProd}/?cantidad=${cantidad}`,
      { responseType: 'blob' }
    ).then((response) => {
      window.open(URL.createObjectURL(response.data));
    })

  }

  const cambiarCantidad = (event) => {
    console.log(event.target.value)
    setCantidad(event.target.value)
  }

  const results = !search ? tipoProducto : tipoProducto.filter((tipoProd) => tipoProd.nombre.toLowerCase().includes(search.toLocaleLowerCase()));


  const bodyInsertar = (
    <div className={styles.modal} align="center">
      <h3>Agregar Nuevo Tipo de Producto</h3>

      <Row>
        <Col>
          <TextField name="codigoDeBarras" className={styles.inputMaterial} label="Codigo de Barras" onChange={handleChange} type="number" />

          <br></br>
          <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} />
          <br></br>

          <TextField className={styles.inputMaterial} label="Categoria" onChange={e => onChangeHandlerCategoria(e.target.value)} value={categoriaTxt}
          />
          <br></br>
          {suggestionsCategoria && suggestionsCategoria.map((suggestions, i) =>
            <div key={i} className="suggestion col-md-12 justify-content-md-center"
              onClick={() => onSuggestHandlerCategoria(suggestions)}
            >{suggestions.nombre}</div>
          )}


          <TextField className={styles.inputMaterial} label="Sub Categoria" onChange={e => onChangeHandlerSubCategoria(e.target.value)} value={subCategoriaTxt}
          />

          <br></br>
          {suggestionsSubcategoria && suggestionsSubcategoria.map((suggestions2, i) =>
            <div key={i} className="suggestion col-md-12 justify-content-md-center"
              onClick={() => onSuggestHandlerSubCategoria(suggestions2)}
            >{suggestions2.nombre}</div>
          )}


          <TextField className={styles.inputMaterial} label="Proveedor" onChange={e => onChangeHandlerProveedor(e.target.value)} value={proveedorTxt}
          />
          <br></br>
          {suggestionsProveedor && suggestionsProveedor.map((suggestions3, i) =>
            <div key={i} className="suggestion col-md-12 justify-content-md-center"
              onClick={() => onSuggestHandlerProveedor(suggestions3)}
            >{suggestions3.nombreProv}</div>
          )}

        </Col>
        <Col>





          <TextField name="descripcion" className={styles.inputMaterial} label="Descripcion" onChange={handleChange} />
          <br></br>

          <TextField name="precio" className={styles.inputMaterial} label="Precio de Compra" onChange={handleChange} type="number"/>
          <br></br>

          <TextField name="precioDeVenta" className={styles.inputMaterial} label="Precio De Venta" onChange={handleChange} type="number" />
          <br></br>

          <TextField name="neto" className={styles.inputMaterial} label="Neto" onChange={handleChange} type="number" />
          <br /><br />


          <InputLabel id="demo-simple-select-label">Metodo Picking</InputLabel>
          <FormControl fullWidth>

            <Select
              name="metodoPicking"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Metodo Picking"
              onChange={handleChange}
            >
              <MenuItem value={"FIFO"}>FIFO</MenuItem>
              <MenuItem value={"LIFO"}>LIFO</MenuItem>
              <MenuItem value={"FEFO"}>FEFO</MenuItem>
              <MenuItem value={"AL AZAR"}>AL AZAR</MenuItem>
            </Select>
          </FormControl>

          <img
            height={100}
            src={
              fotoPreview ?? fotoPlaceholder} alt="Foto del producto" />
          <Button color="primary"

            component="label"
          >
            Subir Foto
            <input
              type="file"
              hidden
              onChange={onChangeFileHandler}
            />
          </Button></Col>
      </Row>

      <div >
        <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
      <div className='errorMessage'>{errorMessage}</div>
    </div>
  )

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Tipo Producto</h3>
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
      <p>Estás seguro que deseas eliminar el tipo de producto<b>{tipoProdSelect && tipoProdSelect.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()} >Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  const bodyImprimirEtiqueta = (
    <div className={styles.modal}>
      <h3>Imprimir Etiqueta</h3>
      <TextField id='cantidadEtiquetas' type="number" name="cantidad" className={styles.inputMaterial} label="Cantidad de Etiquetas" onChange={cambiarCantidad} />
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={() => imprimirEtiquetas()}>Imprimir</Button>
        <Button onClick={() => abrirCerrarModalImprimir()}>Cancelar</Button>
      </div>
    </div>
  )



  useEffect(() => {
    peticionGetTipoProuctos();
    peticionGetCategorias();
    peticionGetSubCategoria();
    peticionGetPrevedores();
  }, [])
  return (
    <div className="App">
      <div className="m-5">
        <h2 className='titulo2'>Lista de Tipos de Producto</h2>
        <div className='buscador'>
          <input value={search} type="text" onChange={searcher} placeholder='buscar por nombre' className='form-control' />
        </div>
        <br />
        <button className="btn btn-primary" onClick={() => abrirCerrarModalInsertar()}>Agregar Nuevo Tipo de Producto</button>
        <div class="table-responsive">

        <table className='table table-striped table-hover mt-5 shadow-lg  tableProductos'>
          <thead>
            <tr className='bg-curso text-white' >
              <th>Foto</th>

              <th>Id</th>
              <th>Codigo De Barras</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>SubCategoria</th>
              <th>Descripcion</th>
              <th>Precio Compra</th>
              <th>Precio Venta</th>

              <th>Neto</th>
              <th>Metodo Picking</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map(tipoProd => {
              return (
                <tr key={tipoProd.idTipoProd}>
                  <td>{
                    <img
                      height={100}
                      src={
                        tipoProd.imageUrl ?? tipoProd.imageUrl !== "" &
                          tipoProd.imageUrl !== null &
                          tipoProd.imageUrl !== undefined
                          ? tipoProd.imageUrl :
                          fotoPlaceholder} alt="Foto del producto" />}</td>
                  <td >{tipoProd.idTipoProd ?? ""}</td>
                  <td>{tipoProd.codigoDeBarras ?? ""}</td>
                  <td>{tipoProd.nombre ?? ""}</td>
                  <td>{tipoProd.categoria.nombre ?? ""}</td>
                  <td>{tipoProd.subCat.nombre ?? ""}</td>
                  <td>{tipoProd.descripcion ?? ""}</td>
                  <td>{tipoProd.precio ?? 0}</td>
                  <td>{tipoProd.precioDeVenta ?? 0}</td>
                  <td>{tipoProd.neto}</td>

                  <td>{tipoProd.metodoPicking ?? "AL AZAR"}</td>

                  <td>
                    <button className="btn btn-primary m-1" onClick={() => seleccionartipoProd(tipoProd, 'Editar')}><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger m-1" onClick={() => seleccionartipoProd(tipoProd, 'Eliminar')}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    {"   "}
                    <button className="btn btn-danger m-1" onClick={() => onImprimir(tipoProd)}><FontAwesomeIcon icon={faBarcode} /></button>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
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
        <Modal
          open={modalImprimir}
          onClose={abrirCerrarModalImprimir}>
          {bodyImprimirEtiqueta}
        </Modal>


      </div>


    </div>
  );
}

export default TipoProdComp;


