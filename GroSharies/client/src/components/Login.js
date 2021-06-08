// React
import React, { useState, useContext } from "react";

// Reactstrap
import { Button, Card, Container, Form, FormGroup, Label, Input } from 'reactstrap';

// React Router DOM
import { useHistory, Link } from "react-router-dom";

// Context
import { UserContext } from "../providers/UserProvider";

// Styles
import "../styles/login.css";

// =========================== IMPORTS END ===========================

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
        .then(() => history.push("/household"))
        .catch(() => alert("Invalid email or password"));
    };

    return (
    <Container id="loginContainer">
        <Card>
            <Form onSubmit={loginSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                        autoComplete="off"
                        id="email" 
                        type="text" 
                        onChange={e => setEmail(e.target.value)} 
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button color="secondary">Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="register">Click Here</Link>
                </em>
            </Form>
        </Card>
    </Container>
    );
}