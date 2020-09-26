import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";

import axios from "axios";

const LogoutButton = ({ setIsLogged }) => {
  const { value, setValue } = useContext(UserContext);
  let history = useHistory();
  const item = localStorage.getItem("userData");
  const token = JSON.parse(item);

  const handleLogout = () => {
    axios
      .post(
        "https://eli-manga-api.herokuapp.com/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);

        localStorage.clear();
        setValue(null);
      })
      .then(() => {
        setIsLogged(false);
      })
      .catch((err) => {
        console.log(err);
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
