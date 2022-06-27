import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDiolog(props) {
    

    return (
        <div>
          
            <Dialog
                open={props.open}
                onClose={props.onNoAccept}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.descripcion}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onNoAccept}>No</Button>
                    <Button onClick={props.onAccept()}>
                        Si
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


