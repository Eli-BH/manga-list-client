import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";

const Login = ({ setIsLogged, isLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    await axios
      .post("https://eli-manga-api.herokuapp.com/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsLogged(true);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLogged) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      {" "}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Label>Email</Form.Label>
        <Form.Control
          required
          className="mb-3"
          type="email"
          placeholder="email"
          name="placeholder"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          className="mb-3"
          type="text"
          placeholder="password"
          name="placeholder"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button type="submit">Submit</Button>{" "}
          <Link to="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
