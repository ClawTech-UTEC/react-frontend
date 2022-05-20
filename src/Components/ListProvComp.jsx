
import React, { Component } from 'react';
import ProvService from '../Servicios/ProvService';
import Principal from './Principal';

class ListProvComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            provs: []
        }
        this.addProv = this.addProv.bind(this);
        this.editProv = this.editProv.bind(this);
        this.deleteProv = this.deleteProv.bind(this);
     

    }


   deleteProv(idProv){
    ProvService.deleteProv(idProv).then( res => {
        this.setState({provs: this.state.provs.filter(prov => prov.idProv !== idProv)});
    });
}

    editProv(idProv) {
        this.props.history.push(`update-prov/${idProv}`);
    }
    componentDidMount() {
        ProvService.getProvs().then((response) => {
            this.setState({ provs: response.data });
        });
    }

    addProv() {
        this.props.history.push("/add-prov");
    }

    render() {
        return (


            <div class="container">
                <Principal/>
                <h1
                    class="text-secondary border border-success border-top-0 border-left-0 border-right-0"
                >Maestro Proveedores</h1>
                <p>
                
                    <a className="btn btn-success btn-xs" onClick={this.addProv}>crear
                        proveedor</a>
                
                </p>
                <table class="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>idProv</th>
                            <th>nombreProv</th>
                            <th>contacto</th>
                            <th>e-mail</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.provs.map(
                                prov => <tr key={prov.idProv}>
                                    <td>{prov.idProv}</td>
                                    <td>{prov.nombreProv}</td>
                                    <td>{prov.contacto}</td>
                                    <td>{prov.email}</td>
                                    <td><button onClick={() => this.editProv(prov.idProv)} className="btn btn-info">Editar</button>
                                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteProv(prov.idProv)} className="btn btn-danger">Eliminar</button></td>
                                    
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
              );
    }
}

export default ListProvComp;