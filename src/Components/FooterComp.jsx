import React, { Component } from 'react';

class FooterComp extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }


    }
    render() {
        return (
            <div>
                <footer className='footer'>
                    <span className='text-muted'>Derechos reservados @ClawTech - Guillermo Rodriguez - Tomas Fernandez - Andres Gutierrez</span>
                </footer>
            </div>
        );
    }
}

export default FooterComp;