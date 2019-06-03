import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";

const Adminfeedback = (props) => {

  
    return (
      <div>
        
         
        
        <Dialog
       
          open={props.feedbackOpen}
          onClose={props.closed}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{ "Send your feedback to user"}</DialogTitle>
          <Divider/>
          <DialogContent>
          <TextField
          name="feedback"
        id="feedback"
        label="Enter your feedback"
        multiline
        rowsMax="4"
        // value={values.multiline}
        onChange={props.changed}
        // className={classes.textField}
        margin="normal"
        // helperText="hello"
        variant="outlined"
        // value={props.feedback}
        autoFocus
        fullWidth
      />
        </DialogContent>
          <DialogActions>
            <Button  color="primary" onClick={props.closed}>
              Cancel
            </Button>
            <Button  color="primary"  variant="contained"  onClick={props.submitted} >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  
}

export default Adminfeedback;