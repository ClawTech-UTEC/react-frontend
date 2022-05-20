import React, { Component } from 'react';
import ProvService from '../Servicios/ProvService';

class ProvUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idProv: this.props.match.params.id,
            nombreProv: '',
            contacto: '',
            email: ''
        }
        this.changeNombreProvHandler = this.changeNombreProvHandler.bind(this);
        this.changeContactoProvHandler = this.changeContactoProvHandler.bind(this);
        this.changeEmailProvHandler = this.changeEmailProvHandler.bind(this);
        this.updateProv = this.updateProv.bind(this);

    }

    updateProv = (e) => {
        e.preventDefault();
        let proveedor = {nombre: this.state.nombreProv, contacto: this.state.contacto, email: this.state.email};
        console.log('proveedor => ' + JSON.stringify(proveedor));
        console.log('idProv => ' + JSON.stringify(this.state.idProv));
        ProvService.updateProv(proveedor, this.state.idProv).then( res => {
            this.props.history.push('/');
        });
    }
    componentDidMount() {
        ProvService.getProvById(this.state.id).then( (res) =>{
            let proveedor = res.data;
            this.setState({nombre: this.state.nombreProv, contacto: this.state.contacto, email: this.state.email});
        });
    }

    changeNombreProvHandler = (event) => {
        this.setState({ nombreProv: event.target.value });
    }
    changeContactoProvHandler = (event) => {
        this.setState({ contacto: event.target.value });
    }
    changeEmailProvHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    cancel(){
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3
                            class="text-secondary border border-success border-top-0 border-left-0 border-right-0">
                            Formulario Proveedores</h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>nombreProv</label>
                                    <input placeholder='nombreProv' name='nombreProv' className='form-control'
                                        value={this.state.nombreProv} onChange={this.changeNombreProvHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>contacto</label>
                                    <input placeholder='contacto' name='contacto' className='form-control'
                                        value={this.state.contacto} onChange={this.changeContactoProvHandler} />
                                </div>
                                <div className='form-group'>
                                    <label>email</label>
                                    <input placeholder='email' name='email' className='form-control'
                                        value={this.state.email} onChange={this.changeEmailProvHandler} />
                                </div>

                                <button className='btn btn-success' onClick={this.updateProv}>Crear</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)} style ={{marginLeft: "50px"}}>Cancelar</button>
                            </form>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}
}

export default ProvUpdate;