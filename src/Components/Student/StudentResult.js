import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Divider, CircularProgress } from "@material-ui/core";

const Studentresult = props => {
  const { open, result, count, total } = props;

  console.log(result === "Fail");
  return (
    <div>
      <Dialog
        open={open}
        //  onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
      {
        props.gettingResult
        ? (
          <DialogContent>
            <CircularProgress />
          </DialogContent>
        ) : (
          <Fragment>
          <DialogTitle id="alert-dialog-title">
            {result === "Fail" ? (
              <div style={{ color: "red", fontSize: "20px" }}>
                Better luck next time{" "}
              </div>
            ) : (
              <div style={{ color: "green", fontSize: "20px" }}>
                "Congratulations You Have passed this level"
              </div>
            )}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You got {count} of {total}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {result === "Fail" ? (
              <Button onClick={props.clickedContinue} color="primary">
                Start Again
              </Button>
            ) : (
              <Button onClick={props.clickedContinue} color="primary" autoFocus>
                Continue
              </Button>
            )}
          </DialogActions>
          </Fragment>
        )
      }
       
      </Dialog>
    </div>
  );
};

export default Studentresult;
