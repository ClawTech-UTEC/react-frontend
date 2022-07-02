



import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { depositoService } from '../Servicios/DepositoService';
import tipoProductoService from '../Servicios/TipoProductoService';
import BackgroundGrid from './Comons/BackgroundGrid';
import { Autocomplete, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Deposito = () => {


    const [deposito, setDeposito] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [productos, setProductos] = useState([]);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [productosSeleccionado, setProductosSeleccionado] = useState(null);
    const [productosAgregados, setProductosAgregados] = useState([]);
    const handleClickOpen = (espacio) => {
        setEspacioSeleccionado(espacio);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const quitarProducto = (producto) => {
        
        espacioSeleccionado.productos = espacioSeleccionado.productos.filter(p => p !== producto); 
        console.log(espacioSeleccionado.productos);
        setEspacioSeleccionado(espacioSeleccionado)
        console.log(espacioSeleccionado)

        alert("Producto eliminado")

    };

    const agregarProducto = () => {
      if (espacioSeleccionado.productos.filter(p => p.idTipoProd === productosSeleccionado.idTipoProd).length !== 0) {
            console.log("agregarProducto");
            alert("El producto ya se encuentra en el espacio");
            return
        }

        espacioSeleccionado.productos.push(productosSeleccionado)
        setEspacioSeleccionado(espacioSeleccionado)
        console.log(espacioSeleccionado)
        setEspacioSeleccionado(espacioSeleccionado)

        alert("Producto agregado")
        document.getElementById("combo-box-demo").value = "";

    }
    useEffect(() => {
        let ignore = false;
        depositoService.getDeposito().then(response => {
            console.log(response.data);
            cargarDeposito(response.data);
        });
        tipoProductoService.getProductos().then(response => {
            console.log(response.data);
            cargarProductos(response.data);
        })
        return () => { ignore = true; }
    }, []);


    const onGuardar = () => {
        depositoService.updateDeposito({ deposito: deposito }).then(response => {
            console.log(response.data);
            alert("Guardado");
        }).catch(error => {
            console.log(error);
            alert("Error");
        }).finally(() => {
            setOpen(false);
        }
        );
    }

    const cargarDeposito = (deposito) => {
        setDeposito(deposito)
    }
    const cargarProductos = (productos) => {
        setProductos(productos)
    }
    const tablaPasillos = () => {
        if (deposito === null || deposito === undefined) {
            console.log("no hay deposito ");
            return <div>No hay pasillos</div>
        }
        if (deposito.pasillos === undefined || deposito.pasillos === null) {
            console.log("no hay pasillo");
            return <div>No hay pasillos</div>
        }
        else {
            console.log("deposito ");
            console.log(deposito.pasillos);
            return deposito.pasillos.map((pasillo) => (
                <Grid item xs={3} >
                    <TableContainer className='table'>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" colSpan={2}>
                                        Pasillo: {pasillo.nomPasillo}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Espacio</TableCell>
                                    <TableCell align="center">Productos</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pasillo.espacio.map((espacio) => (
                                    <TableRow onClick={() => handleClickOpen(espacio)}
                                        key={espacio.nomEspacio}
                                        sx={{ '&:last-child td, &:last-child th ': { border: 0 } }}
                                    >
                                        <TableCell align="center">{espacio.idEsp}</TableCell>
                                        <TableCell align="center">

                                            <List >
                                                {espacio.productos.map((producto) => (
                                                    <ListItem>
                                                        <ListItemText
                                                            primary={producto.nombre}>
                                                        </ListItemText>

                                                    </ListItem>
                                                ))}
                                            </List>
                                        </TableCell>


                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            ))
        }
    }

    return (
        <>
            <BackgroundGrid spacing={1}>
                <Grid item xs={12}>
                    <Typography variant='h5' className='titulo1'>
                        Deposito
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6} className="table">
                    <Typography variant='h6' >
                        Nombre: {deposito.nomDeposito}
                    </Typography>
                    <Typography variant='h6' >
                        Direccion: {deposito.direccion}
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={3}>
                </Grid>
                {tablaPasillos()}
                <Grid item xs={3}>
                </Grid>
            </BackgroundGrid>




            {
                espacioSeleccionado ? <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Productos</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <List >
                                {espacioSeleccionado.productos.map((producto) => (
                                    <ListItem >
                                        <ListItemText
                                            primary={producto.nombre}>
                                        </ListItemText>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DeleteIcon onClick={(event,  value ) => quitarProducto(producto)}/>
                                            </Avatar>
                                        </ListItemAvatar>
                                    </ListItem>
                                ))}
                            </List>
                        </DialogContentText>

                        Agregar Producto
                      
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={productos}
                            onChange={(event, value) => setProductosSeleccionado(value)}
                            getOptionLabel={(option) => option.nombre || ""}
                            renderInput={(params) => <TextField {...params} label="Producto" />}
                        />
                        <Button onClick={agregarProducto} color="primary">
                            Agregar
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={onGuardar} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog> : <></>}</>
    );
}

export default Deposito;
