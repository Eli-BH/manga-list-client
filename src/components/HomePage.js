import React from "react";
import { Redirect } from "react-router-dom";

// import MangaList from "./MangaList";
import MangaEntry from "./MangaEntry";
import Header from "./Header";
const HomePage = ({ isLogged, setIsLogged }) => {
  return (
    <div>
      {!isLogged ? (
        <Redirect to="/" />
      ) : (
        <div>
          <Header setIsLogged={setIsLogged} />

          <MangaEntry />
          {/* <MangaList /> */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
