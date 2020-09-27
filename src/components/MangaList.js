import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const MangaList = () => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const handleButton = async () => {
    await axios
      .get("https://eli-manga-api.herokuapp.com/api/manga")
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(`Bearer ${token}`);
      });
  };
  return (
    <div>
      {token} <Button onClick={() => handleButton()}>Button</Button>
    </div>
  );
};

export default MangaList;
