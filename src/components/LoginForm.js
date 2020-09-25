import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SignUpForm = ({ setIsLogged, toggleForm }) => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Label>email:</Form.Label>
      <Form.Control
        required
        type="email"
        placeholder="enter email"
        name="email"
        value={email}
      />
      <Form.Label>password:</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="enter password"
        name="password"
        value={password}
      />
      <Button variant="secondary" type="submit">
        Submit
      </Button>{" "}
      <Button variant="info" onClick={() => toggleForm(false)}>
        Login
      </Button>
    </Form>
  );
};

export default SignUpForm;
