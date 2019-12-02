import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    },
    margin: "13rem"
  }
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress style={{ color: "orangered" }} size={100} />
    </div>
  );
};

export default Spinner;
