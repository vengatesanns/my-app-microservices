import React from 'react';
import { Button, Dialog, DialogTitle } from '@material-ui/core';
import './confirmation-pop-up.css';


function PopUp(props) {

    const { open, onClose, value, message } = props;
    let option = false;

    const handleClose = () => {
        onClose({ value: value, option: option });
    };


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{message}</DialogTitle>
            <div className="container">
                <Button variant="contained" color="primary" onClick={() => { option = false; handleClose() }}>No</Button>
                <Button variant="contained" color="primary" onClick={() => { option = true; handleClose() }}>Yes</Button>
            </div>
        </Dialog>
    );
}

export default PopUp;