import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LogoutButton = ({ setIsLogged }) => {
  let history = useHistory();
  const item = localStorage.getItem("userData");
  const token = JSON.parse(item);

  const handleLogout = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("https://eli-manga-api.herokuapp.com/api/users/logout", {}, config)
      .then((res) => {
        setIsLogged(false);
        localStorage.clear();
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });
  };

  return (
    <Link to="/">
      {" "}
      <Button onClick={() => handleLogout()}>Logout</Button>{" "}
    </Link>
  );
};

export default LogoutButton;
