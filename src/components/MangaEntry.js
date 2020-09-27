import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
import MangaList from "./MangaList";

const MangaEntry = () => {
  const [manga, setManga] = useState("");
  const [mangaObj, setMangaObj] = useState({
    title: "",
    chapterAmount: 0,
    synopsis: "",
    malScore: 0,
    mangaImage: "",
    malUrl: "",
  });
  const [mangaList, setMangaList] = useState([]);
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    await await axios
      .get(`https://kitsu.io/api/edge/manga?filter[text]=${manga}`)
      .then((res) => {
        const mangainfo = res.data.data[0];
        console.log(res.data.data[0]);
        setMangaObj({
          title: "",
          chapterAmount: 0,
          synopsis: "",
          malScore: 0,
          mangaImage: "",
          malUrl: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
    // await axios
    //   .post("https://eli-manga-api.herokuapp.com/api/manga", {
    //     title: manga,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     window.location.reload(false);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
