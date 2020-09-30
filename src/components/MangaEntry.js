import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import MangaCard from "./MangaCard";
import Container from "react-bootstrap/Container";

const MangaEntry = () => {
  const [manga, setManga] = useState("");

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
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/manga?q=${manga}&page=1`
      )
      .then((res) => {
        const mangainfo = res.data.results[0];
        console.log(res.data.results[0]);

        const dataObj = {
          title: mangainfo.title,
          chapterAmount: mangainfo.chapters,
          synopsis: mangainfo.synopsis,
          malScore: mangainfo.score,
          mangaImage: mangainfo.image_url,
          malURL: mangainfo.url,
          publishing: mangainfo.publishing,
        };
        return dataObj;
      })
      .then((res) => {
        axios
          .post("https://eli-manga-api.herokuapp.com/api/manga", res)
          .then((res) => {
            console.log(res);
            window.location.reload(false);
          })
          .catch((e) => {
            console.log(e);
          });
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={manga}
                  placeholder="enter manga name"
                  onChange={(e) => setManga(e.target.value)}
                />
              </Col>
              <Button type="submit" className="mr-2">
                Enter
              </Button>
            </Row>
          </Form>
        </Container>
      </div>

      <Container fluid>
        <Row className="justify-content-lg-center">
          {mangaList.length > 0 ? (
            mangaList.map((manga) => {
              return <MangaCard manga={manga} key={manga._id} />;
            })
          ) : (
            <Spinner animation="border" size="lg" />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MangaEntry;
