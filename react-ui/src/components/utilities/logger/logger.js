import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdCheckmarkCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { MdError } from "react-icons/md";
import { TiWarning } from "react-icons/ti";

const iconStyles = { width: "35px", height: "30px" };

const variantIcon = {
  success: <IoMdCheckmarkCircle style={iconStyles} />,
  warning: <TiWarning style={iconStyles} />,
  error: <MdError style={iconStyles} />,
  info: <FaInfoCircle style={iconStyles} />,
  close: <IoIosCloseCircleOutline style={iconStyles} />
};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center",
    fontFamily: `Sans-Serif`,
    fontSize: "15px",
    fontWeight: "600"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {Icon}
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          {variantIcon.close}
        </IconButton>
      ]}
      {...other}
    />
  );
}

export default function CustomizedSnackbars(props) {
  const [logger, setLogger] = useState({
    open: props.open,
    log_info: "",
    log_message: ""
  });
  useEffect(() => {
    setLogger(props);
  }, [props]);
  const handleClose = () => {
    setLogger({ open: false, log_info: "", log_message: "" });
    props.reset();
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={logger.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={logger.log_info}
          message={logger.log_message}
        />
      </Snackbar>
    </div>
  );
}

CustomizedSnackbars.propTypes = {
  open: PropTypes.bool,
  log_message: PropTypes.string,
  log_info: PropTypes.oneOf(["error", "info", "success", "warning", "none"])
    .isRequired
};

const Logger = {
  success: function(message) {
    return { open: true, log_info: "success", log_message: message };
  },
  warn: function(message) {
    return { open: true, log_info: "warning", log_message: message };
  },
  error: function(message) {
    return { open: true, log_info: "error", log_message: message };
  },
  info: function(message) {
    return { open: true, log_info: "info", log_message: message };
  },
  default: function() {
    return { open: false, log_info: "none", log_message: "" };
  }
};
export { Logger };
