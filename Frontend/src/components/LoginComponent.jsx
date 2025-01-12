import React, { useContext, useRef, useState } from 'react';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';
import AuthContext from '../context/Authprovider';
import { Link, useNavigate } from 'react-router-dom';
import UsersService from '../services/UsersService';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LoginComponent = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const userRef = useRef();
    const errorRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username received from form", username + password);
        const obj = { "username": username, "password": password };
        setUsername("");
        setPassword("");
        UsersService.loginUser(obj).then(response => {
            console.log("response received from login API", response.data);
            const accessToken = response.data.accessToken;
            const username = response.data.usersDto.username;
            const role = response.data.usersDto.role;
            const userId = response.data.usersDto.userId;
            console.log("User ID from login response:", userId);
            setAuth({ username, role, userId, accessToken });
            navigate('/vehicleslist');
        }).catch(error => {
            console.log("Error from login API", error);
            setErrMsg("Login failed. Please check your credentials.");
        });
    }

    return (
        <div id="loginbackground">

        <Container className="login custom-margin-top">
            <Row className="justify-content-center">
                <Col md={3}>
                    <section style={{position:"absolute",top:"10%",backgroundColor:"rgb(170, 203, 219)",borderRadius:"10px",width:"30%",left:"35%"}}>
                        {errMsg && <Alert variant="danger" ref={errorRef}>{errMsg}</Alert>}

                        <h1 className="text-center">Sign In</h1>
                        <Form style={{marginLeft:"5%",marginRight:"5%"}}onSubmit={handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="password" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Form.Group>

                            <Button variant="success" type="submit" className="mt-3 w-100">Sign In</Button>
                            <div className="already text-center mt-3">
                        <p>Need an account? <Link to="/userregister">Register</Link></p>
                    </div>
                        </Form>
                    </section>
                    
                </Col>
            </Row>
        </Container>
        </div>
    );
};
