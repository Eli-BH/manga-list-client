import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";

const Header = () => {
  const [mangaList, setMangaList] = useState("");
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

  return (
    <Jumbotron>
      <h1>Hello, World!</h1>
      <p>
        "Water. Earth. Fire. Air. Long ago, the four nations lived together in
        harmony. Then, everything changed when the Fire Nation attacked. Only
        the Avatar, master of all four elements, could stop them, but when the
        world needed him most, he vanished.{" "}
      </p>
      <div>
        <h4></h4>
        <h4></h4>
      </div>
    </Jumbotron>
  );
};

export default Header;
