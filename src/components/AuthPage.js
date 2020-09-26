import React from "react";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";

const AuthPage = ({ isLogged }) => {
  if (isLogged) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <Link to="/login">
        <Button variant="info">Login</Button>
      </Link>

      <Link to="/signup">
        <Button variant="danger">Sign up</Button>
      </Link>
    </div>
  );
};

export default AuthPage;
