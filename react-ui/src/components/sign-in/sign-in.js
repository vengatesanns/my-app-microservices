import React from 'react';
import SignInStyle from './sign-in.module.css';
import { Container, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { FaUserCircle, FaUserAlt, FaLock } from 'react-icons/fa';

export default class Login extends React.Component {
    render() {
        return (
            <Container component="main">
                <div className={SignInStyle.login_panel}>
                    <Card className="text-center">
                        <Card.Header ><FaUserCircle className={SignInStyle.card_title_icon} /></Card.Header>
                        <Card.Body>
                            <Form noValidate>
                                <Form.Group md="4" controlId="validationUsername">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"><FaUserAlt /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            aria-describedby="inputGroupPrepend"
                                            name="username"
                                        />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group md="4" controlId="validationPassword">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"><FaLock /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            aria-describedby="inputGroupPrepend"
                                            name="password"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form>

                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button type="clear" className={SignInStyle.button_color}>Clear</Button>
                            <Button type="submit" className={SignInStyle.button_color}>Login</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Container>
        );
    }
} 