import { Button } from '@material-ui/core';
import React from 'react';

const ButtonFormulario = ({ onClick, children, type }) => {
    return (
        <div className='button' >
            <Button variant="contained" type={type} 
                color="primary" onClick={onClick}> {children}</Button>
        </div>
    );
}

export default ButtonFormulario;
