import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Signup = ({ setIsLogged, isLogged }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    await axios
      .post("https://eli-manga-api.herokuapp.com/api/users/signup", {
        email: email,
        username: username,
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
    <div className="container">
      <h1 className="mb-5 m4-5 pt-5">Sign Up</h1>
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
        <Form.Label>Username</Form.Label>
        <Form.Control
          required
          className="mb-3"
          type="username"
          placeholder="username"
          name="placeholder"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <div className="mt-5">
          <Button type="submit" variant="deep">Submit</Button>{" "}
          <Link to="/login" >
            <Button variant="warning">Login</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
