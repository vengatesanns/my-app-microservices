import React, { useState } from "react";
import SignInStyle from "./SignIn.module.css";
import { Container, Card, Button, Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import FormValidator from "../utilities/form-validators";
import { Validators, CustomFormControl } from "../utilities/validators_const";
import PopUp from "../utilities/confirmation-pop-up/confirmation-pop-up";
import CustomizedSnackbars, { Logger } from "../utilities/logger/logger";
import Spinner from "../common/spinner/spinner";

const setFormValidators = () => {
  return new FormValidator({
    username: [
      CustomFormControl(Validators.required, [], "Username is required")
    ],
    password: [
      CustomFormControl(Validators.required, [], "Password is required")
    ]
  });
};

const SignIn = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
    form: setFormValidators().valid()
  });
  const [dialogProp, setDialogProp] = useState({
    dialogOpen: false,
    dialogValue: "",
    dialogMessage: ""
  });
  const [logger, setLogger] = useState(Logger.default());
  const [loader, setLoader] = useState(false);
  const { username, password, form } = state;

  //Set Value to properties
  const valueHandlerChange = event => {
    const stateObj = state;
    state[event.target.name] = event.target.value;
    setState({ ...stateObj });
  };

  //form submit
  const submitForm = event => {
    event.preventDefault();
    const form = setFormValidators().validation(state);
    setState({
      username: state.username,
      password: state.password,
      form: form
    });
    if (form.isValid) {
      setLoader(true);
      axios
        .post(`${process.env.REACT_APP_OAUTH_API}`, getAPIParams(), {
          headers: getHeaders()
        })
        .then(response => {
          setLoader(false);
          setLogger(Logger.success("Login Successfully!!!"));
          console.log(response);
        })
        .catch(error => {
          setLoader(false);
          console.error(error);
        });
    }
  };

  //Set API Params
  const getAPIParams = () => {
    const params = new URLSearchParams();
    params.append("username", state.username);
    params.append("password", state.password);
    params.append("grant_type", `${process.env.REACT_APP_GRANT_TYPE}`);
    return params;
  };

  //Set Headers
  const getHeaders = () => {
    const headers = {
      Authorization:
        "Basic " +
        btoa(
          `${process.env.REACT_APP_CLIENT_ID}${":"}${
            process.env.REACT_APP_CLIENT_SECRET
          }`
        ),
      "Content-type": "application/x-www-form-urlencoded"
    };
    return headers;
  };

  //resetForm()
  const resetForm = () => {
    setState({
      username: "",
      password: "",
      form: setFormValidators().valid()
    });
    setLogger(Logger.warn("Form cleared successfully!!!"));
  };

  //reset logger
  const resetLogger = () => {
    setLogger(Logger.default());
  };

  //Dialog Operations
  const openDialog = () => {
    setDialogProp({
      dialogOpen: true,
      dialogMessage: "Are you sure want to Clear Form?",
      dialogValue: ""
    });
  };

  const closeDialog = dialogResponse => {
    setDialogProp({
      dialogOpen: false,
      dialogValue: dialogResponse.value,
      dialogMessage: ""
    });

    //For reset form
    if (dialogResponse.option) {
      resetForm();
    }
  };

  return (
    <div>
      {loader ? (
        <Spinner />
      ) : (
        <Container component="main">
          <div className={SignInStyle.login_panel}>
            <Form noValidate onSubmit={submitForm}>
              <Card className="text-center">
                <Card.Header>
                  <FaUserCircle className={SignInStyle.card_title_icon} />
                </Card.Header>
                <Card.Body>
                  <div className={SignInStyle.form_group}>
                    <TextField
                      required
                      name="username"
                      label="Username"
                      margin="normal"
                      variant="outlined"
                      type="text"
                      onChange={valueHandlerChange}
                      value={username}
                      error={form.username.isInvalid}
                      helperText={form.username.message}
                    />
                  </div>
                  <div className={SignInStyle.form_group}>
                    <TextField
                      required
                      name="password"
                      label="Password"
                      margin="normal"
                      variant="outlined"
                      type="password"
                      onChange={valueHandlerChange}
                      value={password}
                      error={form.password.isInvalid}
                      helperText={form.password.message}
                    />
                  </div>
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button
                    className={SignInStyle.button_color}
                    onClick={openDialog}
                  >
                    Clear
                  </Button>
                  <Button type="submit" className={SignInStyle.button_color}>
                    Login
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          </div>
          <PopUp
            open={dialogProp.dialogOpen}
            value={dialogProp.dialogValue}
            onClose={closeDialog}
            message={dialogProp.dialogMessage}
          />
          <CustomizedSnackbars {...logger} reset={resetLogger} />
        </Container>
      )}
    </div>
  );
};
export default SignIn;
