import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

const Cardquestion = props => {
  const { classes } = props;
  return (
    <div>
      {props.loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "200px"
          }}
        >
          <CircularProgress className={classes.progress} />
        </div>
      ) : null}

      <ol type="1" style={{ fontSize: "20px" }}>
        {props.props.map(card => {
          return (
            <li>
              <Card style={{ margin: "12px 12px 12px" }}>
                <CardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" gutterBottom fullWidth>
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
                          onClick={() => props.deleted(card)}
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
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ width: "50%" }}
                    >
                      A: {card.option.a}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ width: "50%" }}
                    >
                      B: {card.option.b}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ width: "50%" }}
                    >
                      C: {card.option.c}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      style={{ width: "50%" }}
                    >
                      D: {card.option.d}
                    </Typography>
                  </div>
                  <Typography variant="subtitle1" gutterBottom fullWidth>
                    Correct Answer: {card.answer.toUpperCase()}
                  </Typography>
                </CardContent>{" "}
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default withStyles(styles)(Cardquestion);
