import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

const MangaList = () => {
  const [manga, setManga] = useState([]);
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleButton = async () => {
    await axios
      .get("https://eli-manga-api.herokuapp.com/api/manga")
      .then((res) => {
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
      <ListGroup>
        <div>
          {manga ? (
            manga.map((manga) => {
              return (
                <ListGroup.Item
                  key={manga._id}
                  onClick={() => alert(manga._id)}
                >
                  {manga.title}
                </ListGroup.Item>
              );
            })
          ) : (
            <h5>no manga</h5>
          )}
        </div>
      </ListGroup>
    </div>
  );
};

export default MangaList;
