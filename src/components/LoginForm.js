import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { UserContext } from "./UserContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUpForm = ({ setIsLogged, toggleForm }) => {
  const [validated, setValidated] = useState(false);
  const [locEmail, setlocEmail] = useState("");
  const [locPassword, setlocPassword] = useState("");
  const { value, setValue } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    axios
      .post("https://eli-manga-api.herokuapp.com/api/users/login", {
        email: locEmail,
        password: locPassword,
      })
      .then((res) => {
        console.log(res);
        setValue(res.data);
        setIsLogged(true);
        localStorage.setItem("userData", JSON.stringify(res.data, null, 2));

        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Label>email:</Form.Label>
      <Form.Control
        required
        type="email"
        placeholder="enter email"
        name="email"
        value={locEmail}
        onChange={(e) => setlocEmail(e.target.value)}
      />
      <Form.Label>password:</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="enter password"
        name="password"
        value={locPassword}
        onChange={(e) => setlocPassword(e.target.value)}
      />
      <Button variant="secondary" type="submit">
        Submit
      </Button>{" "}
      <Button variant="info" onClick={() => toggleForm(false)}>
        Signup
      </Button>
    </Form>
  );
};

export default SignUpForm;
