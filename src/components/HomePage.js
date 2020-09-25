import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

import LogoutButton from "./LogoutButton";
import axios from "axios";

const Homepage = ({ isLogged, setIsLogged }) => {
  const { value } = useContext(UserContext);
  const user = localStorage.getItem("userData");

  const data = JSON.parse(user);

  return (
    <div>
      {isLogged ? (
        <LogoutButton setIsLogged={setIsLogged} />
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default Homepage;
