import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const MangaEntry = () => {
  const [manga, setManga] = useState("");
  const [mangaList, setMangaList] = useState([]);
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://eli-manga-api.herokuapp.com/api/manga", {
        title: manga,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get("https://eli-manga-api.herokuapp.com/api/manga")
      .then((res) => {
        console.log(res.data);
        setMangaList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            value={manga}
            placeholder="enter manga name"
            onChange={(e) => setManga(e.target.value)}
          />
          <Button type="submit">Enter</Button>
        </Form>
      </div>
      <div>
        {" "}
        <ListGroup>
          <div>
            {mangaList ? (
              mangaList.map((manga) => {
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
    </div>
  );
};

export default MangaEntry;
