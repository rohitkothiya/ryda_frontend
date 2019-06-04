import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const Cardquestion = props => {
  const { classes } = props;
  return (
    <div>
      {
        props.loading
        ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "200px"
            }}
          >
            <CircularProgress className={classes.progress} />
          </div>
        ) 
        : props.props.length > 0
          ? (
            <ol type="1" style={{ fontSize: "20px" }}>
            {props.props.map(card => {
              return (
                <li key={card._id}>
                  <Card style={{ margin: "12px 12px 12px" }}>
                    <CardContent>
                      <div
                        style={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography variant="h6"   align="left" fullWidth>
                          {card.questionstring}
                        </Typography>
                        <div style={{ display: 'flex' }}>
                          <IconButton
                            aria-label="Edit"
                            onClick={() => props.clicked(card)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            aria-label="Delete"
                            color="action"
                            onClick={() => props.deleted(card)}
                          >
                            <DeleteIcon
                              fontSize="small"
                              color="action"
                              onClick={props.deleted}
                            />
                          </IconButton>
                        </div>
                      </div>
                      {
                        card.image 
                        ? (
                          <div style={{ padding: '12px', maxWidth: '100%' }}> <img src={card.image} style={{ borderRadius: '6px' }} /> </div>
                        ) : ''
                      }
                      <div style={{ display: "flex", flexDirection: "column",alignItems:"flex-start" }}> 
                        <Typography
                          variant="subtitle1"
                          align="left"
                          // style={{ width: "50%" }}
                        >
                          A: {card.option.a}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          align="left"
                          // gutterBottom
                          // style={{ width: "50%" }}
                        >
                          B: {card.option.b}
                        </Typography>
                     
                    
                        <Typography
                          variant="subtitle1"
                          align="left"
                          // gutterBottom
                          // style={{ width: "50%" }}
                        >
                          C: {card.option.c}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          align="left"
                          // gutterBottom
                          // style={{ width: "50%" }}
                        >
                          D: {card.option.d}
                        </Typography>
                     
                      <Typography variant="subtitle1"   align="left"  fullWidth>
                        Correct Answer: {card.answer.toUpperCase()}
                      </Typography>
                      </div>
                    </CardContent>{" "}
                  </Card>
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
                <Button onClick={() => props.deletedConfirm(card)} color="primary" autoFocus>
                {props.dltbtnLoading ?  "Deleting" : "Continue" }
                </Button>
              </DialogActions>
            </Dialog>
                </li>
              );
            })}
          </ol>
      
          )
          : (
            <div style={{marginTop:"200px",fontSize:"28px",marginLeft:"150px"}}>You don't have any Questions available</div>
          )
        }

       
    </div>
  );
};

export default withStyles(styles)(Cardquestion);
