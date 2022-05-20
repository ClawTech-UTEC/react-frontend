import React, { Component } from 'react';
import SubCatService from '../Servicios/SubCatService';

class CreateSubCat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nombre: ''
        }
        this.changeNombreHandler = this.changeNombreHandler.bind(this);

        this.saveProv = this.saveProv.bind(this);
    }

    // step 3

    saveSubCat = (e) => {
        e.preventDefault();
        let subCat = { nombre: this.state.nombre };
        console.log('subCat =>' + JSON.stringify(subCat));

        SubCatService.createSubCat(subCat).then(response => {
            this.props.history.push('/');
        })
    }
    cancel() {
        this.props.history.push("/");
    }
    changeNombreHandler = (event) => {
        this.setState({ nombre: event.target.value });
    }

   

    cancel() {
        this.props.history.push('/employees');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> nombre </label>
                                        <input placeholder="nombre" name="nombre" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.emailId} onChange={this.changeEmailHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveSubCat}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateSubCat;