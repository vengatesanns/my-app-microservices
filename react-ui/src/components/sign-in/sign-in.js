import React from 'react';
import SignInStyle from './sign-in.module.css';
import { Container, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { FaUserCircle, FaUserAlt, FaLock } from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

export default class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorFlag: {
                username: false,
                password: false,
                formValid: false
            }
        };
    }

    //Set Value to properties
    valueHandlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    //form submit
    submitForm = () => {
        axios.post(`${process.env.REACT_APP_OAUTH_API}`,
            this.getAPIParams(), { headers: this.getHeaders() })
            .then(response => console.log(response));
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


    //Validate Controls
    // checkFormValidation() {
    //     if ()
    // }





    render() {
        const { username, password } = this.state;
        return (
            <Container component="main">
                <div className={SignInStyle.login_panel}>
                    <Card className="text-center">
                        <Card.Header ><FaUserCircle className={SignInStyle.card_title_icon} /></Card.Header>
                        <Card.Body>
                            <Form>
                                <div className={SignInStyle.form_group}>
                                    <TextField
                                        error
                                        name="username"
                                        label="Username"
                                        helperText="Incorrect entry."
                                        margin="normal"
                                        variant="outlined"
                                        type="text"
                                        onChange={this.valueHandlerChange}
                                        value={username}
                                    />
                                </div>
                                <div className={SignInStyle.form_group}>
                                    <TextField
                                        error={true}
                                        name="password"
                                        label="Password"
                                        helperText="Incorrect entry."
                                        margin="normal"
                                        variant="outlined"
                                        type="password"
                                        onChange={this.valueHandlerChange}
                                        value={password}
                                    />
                                </div>
                            </Form>

                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button type="clear" className={SignInStyle.button_color}>Clear</Button>
                            <Button type="submit" className={SignInStyle.button_color} onClick={this.submitForm}>Login</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        );
    }
} 