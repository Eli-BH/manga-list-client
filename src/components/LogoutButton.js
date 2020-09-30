import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogoutButton = ({ setIsLogged }) => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  const history = useHistory();

  const handleLogout = async () => {
    await axios
      .post(
        "https://eli-manga-api.herokuapp.com/api/users/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setIsLogged(false);
        localStorage.clear();
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Button
      onClick={() => {
        handleLogout();
      }}
      size="sm"
    >
      logout
    </Button>
  );
};

export default LogoutButton;
