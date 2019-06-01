import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Deletedailog = (props) => {
//   state = {
//     open: false,
//   };

//   handleClickOpen = () => {
//     this.setState({ open: true });
//   };

//   handleClose = () => {
//     this.setState({ open: false });
//   };

  
    return (
      <div>
        
         
        
        <Dialog
          open={props.openAlert}
        //   onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ "Are you sure you want to delete ?"}</DialogTitle>
         
          <DialogActions>
            <Button onClick={props.deletedCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={props.deletedConfirm} color="primary" autoFocus>
              Coniinue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default Deletedailog;