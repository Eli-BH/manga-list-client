import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const MangaList = () => {
  const [manga, setManga] = useState(null);
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleButton = async () => {
    await axios
      .get("https://eli-manga-api.herokuapp.com/api/manga")
      .then((res) => {
        console.log(res.data);
        setManga(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {JSON.stringify(manga, null, 2)}{" "}
      <Button onClick={() => handleButton()}>Button</Button>
    </div>
  );
};

export default MangaList;
