

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Adminsidebar from './AdminSidebar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});





class Adminnews extends Component  {

  state ={
    isAddNews:false,
    questionstring:"",
    link:"",
    lastDate:""
  }



  handleAddnewsOpen = () => {
    this.setState({isAddNews:!this.state.isAddNews});
  }
  handleAddNews = () => {
    this.setState({isAddNews:false});

      let body = {
        questionstring:this.state.questionstring
      }
  }

   render (){
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminsidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button variant="outlined" color="primary" onClick={this.handleAddnewsOpen}>
        Create a Latest News
      </Button>
      <Dialog
        open={this.state.isAddNews}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Latest News?"}</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label=""
              type="news"
              fullWidth
              onChange={this.handleChangeInputText}
            />
            <TextField
        id="date"
        label="Last Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        onChange={this.handleChangeInputText}
        InputLabelProps={{
          shrink: true,
        }}
      />
              <TextField
              autoFocus
              margin="dense"
              id="linkaddress"
              label="Link Address"
              type="text"
              fullWidth
              onChange={this.handleChangeInputText}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAddNews} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      </main>
    </div>
  );
}
}

Adminnews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminnews);


























