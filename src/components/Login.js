import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Login = ({ setEmail, setPassword, password, email, auth, setAuth }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      alert("please enter your info");
    }
    setValidated(true);

    axios({
      method: "post",
      url: "https://eli-manga-api.herokuapp.com/api/users/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setAuth(true);
        }
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center m-6">
          <Col md={6}>
            <div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your accoutn email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    autoComplete="new-password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-info" type="submit">
                  Login
                </Button>
                <Link to="/signup">
                  <Button
                    variant="outline-danger"
                    className="ml-2"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Link>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
