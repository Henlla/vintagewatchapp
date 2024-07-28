import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmMessage(props) {
    const { openConfirm, handleCloseConfirm, confirmValue, deleteFunction, confirmContent } = props

    return (
        <Dialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle>Notification</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {confirmContent}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseConfirm}>No</Button>
                <Button onClick={() => deleteFunction(confirmValue)}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}