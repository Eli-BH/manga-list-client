import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";

import LogoutButton from "./LogoutButton";

const Header = ({ setIsLogged }) => {
  const [mangaList, setMangaList] = useState("");
  let count = 0;
  let userInfo = localStorage.getItem("user");
  userInfo = JSON.parse(userInfo).user ? JSON.parse(userInfo).user : "";

  useEffect(() => {
    axios
      .get("https://eli-manga-api.herokuapp.com/api/manga")
      .then((res) => {
        console.log(res.data);
        setMangaList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  for (let i = 0; i < mangaList.length; i++) {
    if (mangaList[i].complete === true) {
      console.log(mangaList[i].title);
      count += 1;
    }
  }

  return (
    <Jumbotron>
      <h1>Hello, {userInfo.username}</h1>
      <p>Welcom to your manga list!</p>
      <div>
        <h4>{` ${mangaList.length} Manga `}</h4>
        <h4>{`${count} are complete`}</h4>
      </div>
      <LogoutButton setIsLogged={setIsLogged} />
    </Jumbotron>
  );
};

export default Header;
