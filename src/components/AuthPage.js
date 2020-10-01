import React from "react";
import Button from "react-bootstrap/Button";
import { Link, Redirect } from "react-router-dom";
import "../App.scss";

const AuthPage = ({ isLogged }) => {
  if (isLogged) {
    return <Redirect to="/home" />;
  }
  return (
    <div
      style={{
        backgroundColor: "#50C9CE",
        height: "100vh",
        color: "white",
        textAlign: "center",
      }}
    >
      <div className="d-flex flex-column align-items-center mb-5 pt-5">
        <div>
          <h1> Welcome to Your Manga List !</h1>
        </div>

        <div className="align-content-between m-5">
          {" "}
          <Link to="/login" className="mr-5">
            <Button variant="deep">Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="warning">Sign up</Button>
          </Link>
        </div>
      </div>
      <p style={{ color: "#50C9CE" }}>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </p>
    </div>
  );
};

export default AuthPage;
