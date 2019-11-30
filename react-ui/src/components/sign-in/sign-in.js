import React from 'react';
import SignInStyle from './sign-in.module.css';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import FormValidator from '../utilities/form-validators';
import { Validators, CustomFormControl } from '../utilities/validators_const';
import PopUp from '../utilities/confirmation-pop-up/confirmation-pop-up';
import CustomizedSnackbars from '../utilities/logger/logger';
import Logger from '../utilities/logger/logger_const'

export default class Login extends React.Component {

    constructor() {
        super();
        this.setFormValidators();
        this.state = {
            username: '',
            password: '',
            form: this.formValidator.valid(),
            dialogOpen: false,
            dialogValue: '',
            dialogMessage: ''
        };
        this.logger = new Logger();
    }


    //Set Value to properties
    valueHandlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //form submit
    submitForm = (event) => {
        event.preventDefault();
        const form = this.formValidator.validation(this.state);
        this.setState({ form });
        if (form.isValid) {
            axios.post(`${process.env.REACT_APP_OAUTH_API}`,
                this.getAPIParams(), { headers: this.getHeaders() })
                .then(response => {
                    this.logInfo = this.logger.info("Login Successfully!!!");
                    console.log(response)
                })
                .catch(error => {
                    console.error(error)
                });
        }
    }


    //Set API Params
    getAPIParams = () => {
        const params = new URLSearchParams();
        params.append("username", this.state.username);
        params.append("password", this.state.password);
        params.append("grant_type", `${process.env.REACT_APP_GRANT_TYPE}`);
        return params;
    }

    //Set Headers
    getHeaders = () => {
        const headers = {
            'Authorization': 'Basic ' + btoa(`${process.env.REACT_APP_CLIENT_ID}${':'}${process.env.REACT_APP_CLIENT_SECRET}`),
            'Content-type': 'application/x-www-form-urlencoded'
        };
        return headers;
    }

    //Set Form Validators
    setFormValidators() {
        this.formValidator = new FormValidator({
            username: [CustomFormControl(Validators.required, [], 'Username is required')],
            password: [CustomFormControl(Validators.required, [], 'Password is required')]
        });
    }

    //resetForm()
    resetForm = () => {
        this.setState({
            username: '',
            password: '',
            form: this.formValidator.valid()
        });
        this.logInfo = this.logger.warn("Form cleared successfully!!!");
    }


    //Dialog Operations
    openDialog = () => {
        this.setState({
            dialogOpen: true,
            dialogMessage: 'Are you sure want to Clear Form?'
        });
    };
    closeDialog = (dialogResponse) => {
        this.setState({
            dialogOpen: false,
            dialogValue: dialogResponse.value
        });
        //For reset form
        if (dialogResponse.option) {
            this.resetForm();
        }
    };


    render() {
        const { username, password, form, dialogOpen, dialogValue, dialogMessage } = this.state;
        return (
            <Container component="main">
                <div className={SignInStyle.login_panel}>
                    <Form noValidate onSubmit={this.submitForm}>
                        <Card className="text-center">
                            <Card.Header ><FaUserCircle className={SignInStyle.card_title_icon} /></Card.Header>
                            <Card.Body>
                                <div className={SignInStyle.form_group}>
                                    <TextField
                                        required
                                        name="username"
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        type="text"
                                        onChange={this.valueHandlerChange}
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
                                        onChange={this.valueHandlerChange}
                                        value={password}
                                        error={form.password.isInvalid}
                                        helperText={form.password.message}
                                    />
                                </div>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button type="clear" className={SignInStyle.button_color} onClick={this.openDialog}>Clear</Button>
                                <Button type="submit" className={SignInStyle.button_color} >Login</Button>
                            </Card.Footer>
                        </Card>
                    </Form>
                </div>
                <PopUp open={dialogOpen} value={dialogValue} onClose={this.closeDialog} message={dialogMessage} />
                <CustomizedSnackbars {...this.logInfo} />
            </Container>
        );
    }
} 