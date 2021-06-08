// React
import React, { useState, useContext } from "react";

// React Router DOM
import { useHistory } from "react-router-dom";

// Reactstrap
import { Button, Container, Card, Form, FormGroup, Label, Input } from 'reactstrap';

// Context
import { UserContext } from "../providers/UserProvider";

// Styles
import "../styles/register.css";

// =========================== IMPORTS END ===========================

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match.");
        } else {
            const user = { email, firstName, lastName };
            register(user, password)
            .then(() => history.push("/"));
        }
    };

    return (
    <Container id="registrationContainer">
        <Card>
            <Form onSubmit={registerClick}>
                <FormGroup>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </Form>
        </Card>
    </Container>
  );
}