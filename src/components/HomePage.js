import React from "react";
import { Redirect } from "react-router-dom";

import LogoutButton from "./LogoutButton";
// import MangaList from "./MangaList";
import MangaEntry from "./MangaEntry";

const HomePage = ({ isLogged, setIsLogged }) => {
  let userInfo = localStorage.getItem("user");
  userInfo = JSON.parse(userInfo).user ? JSON.parse(userInfo).user : "";

  return (
    <div>
      {!isLogged ? (
        <Redirect to="/" />
      ) : (
        <div>
          <p>Hello {userInfo.username}</p>{" "}
          <LogoutButton setIsLogged={setIsLogged} />
          <MangaEntry />
          {/* <MangaList /> */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
