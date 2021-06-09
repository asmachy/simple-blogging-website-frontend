import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class DialogBox extends React.Component {
    render() {
        const {isOpen, deleteHandlerYes, deleteHandlerNo} = this.props;
        let dialog = (
            <Dialog
                open={isOpen}
                onClose={deleteHandlerNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            > 
            <DialogTitle id="alert-dialog-title">{" Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    This blog will be permanently deleted.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteHandlerNo} color="primary">
                    No
                </Button>
                <Button onClick={deleteHandlerYes} color="primary" autoFocus>
                    Yes
                </Button>
            </DialogActions>
            </Dialog>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div>{dialog}</div>
        );
    }
}

export default DialogBox;