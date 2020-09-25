import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    axios
      .post("https://eli-manga-api.herokuapp.com/api/users/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        setUserInfo(response.data);
        setValue(response.data);
        setIsLogged(true);
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data, null, 2)
        );

        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });

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
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Label>email:</Form.Label>
      <Form.Control
        required
        type="email"
        placeholder="enter email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Label>password:</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="enter password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="secondary" type="submit">
        Submit
      </Button>{" "}
      <Button variant="info" onClick={() => toggleForm(true)}>
        Login
      </Button>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Form>
  );
};

export default SignUpForm;
