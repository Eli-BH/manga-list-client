import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Jumbotron from "react-bootstrap/Jumbotron";

import LogoutButton from "./LogoutButton";
import axios from "axios";

const Homepage = ({ isLogged, setIsLogged }) => {
  const { value } = useContext(UserContext);
  const user = localStorage.getItem("userData");

  const data = JSON.parse(user);

  return (
    <div>
      {isLogged ? (
        <div>
          <Jumbotron>
            <h1>Here is your manga collection, {data.user.username}</h1>
            <p>
              <LogoutButton setIsLogged={setIsLogged} />
            </p>
          </Jumbotron>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default Homepage;
