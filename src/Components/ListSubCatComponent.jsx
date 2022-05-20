import React, { Component } from 'react';
import SubCatService from '../Servicios/SubCatService';

class ListSubCatComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            subCats: []
        }
        this.addSubCat = this.addSubCat.bind(this);

    }



    componentDidMount() {
    SubCatService.getSubCats().then((response) => {
        this.setState({subCats: response.data});
    });
    }

    addSubCat() {
        this.props.history.push('/add-subCat/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Maestro de Sub Categorias</h2>
                <p>
                    <a className="btn btn-success btn-xs" onClick={this.addSubCat}> Crear SubCategoria</a>
                    </p>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> idSubCat</th>
                                <th> nombre</th>
                                
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.subCats.map(
                                    subCat =>
                                        <tr key={subCat.idSubCat}>
                                            <td> {subCat.idSubCat} </td>
                                            <td> {subCat.nombre} </td>

                                            
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default ListSubCatComponent;