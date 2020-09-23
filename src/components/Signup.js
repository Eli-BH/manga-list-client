import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const Signup = ({
  setEmail,
  setPassword,
  password,
  email,
  setUsername,
  username,
  setAuth,
  setToken,
}) => {
  const [validated, setValidated] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    axios({
      method: "post",
      url: "https://eli-manga-api.herokuapp.com/api/users/signup",
      data: {
        username: username,
        email: email,
        password: password,
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setAuth(true);
          history.push("/test");
        }
        setToken(response.data.token);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container>
        <Row className="justify-content-center m-6">
          <Col md={6}>
            <div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="validationUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your account email.
                  </Form.Control.Feedback>
                </Form.Group>
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
                    Please provide your account email.
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
                  Submit
                </Button>
                <Link to="/">
                  <Button
                    variant="outline-warning"
                    className="ml-2"
                    type="submit"
                  >
                    Login
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

export default Signup;
