import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const  Studentresult = (props) => {
        console.log("props");
      const {open,result,count,total} =props
      console.log(props.result)
      console.log(result === "Fail");
    return (
          <div>
           <Dialog
            open={open}
            //  onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your result?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
             your result {count} out of {total}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
           
            {result === "Fail" ? <Button  onClick={props.clickedContinue} color="primary">
              Start Again
            </Button>
            : <Button   onClick={props.clickedContinue} color="primary" autoFocus>
            Continue
          </Button> 
         
             } 
            
          </DialogActions>
        </Dialog>
      </div>
    )
  
}

export default Studentresult;