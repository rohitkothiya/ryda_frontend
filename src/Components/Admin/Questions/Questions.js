import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Cardquestion = props => {
  return (
    <div>
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
                    <IconButton aria-label="Edit" onClick={() => props.clicked(card)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                  </div>
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
                    Answer: {card.option.a}
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

export default Cardquestion;
