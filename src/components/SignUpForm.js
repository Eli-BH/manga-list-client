import React, { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SignUpForm = ({ setUserInfo, setIsLogged, toggleForm }) => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { value, setValue } = useContext(UserContext);

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
      <Form.Label>Username:</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="enter username"
        name="username"
        value={username}
      />
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
      <Button variant="secondary">Submit</Button>{" "}
      <Button variant="info" onClick={() => toggleForm(true)}>
        Login
      </Button>
      {value}
      <Button variant="danger" onClick={() => setValue("still working")}>
        Change value
      </Button>
    </Form>
  );
};

export default SignUpForm;
