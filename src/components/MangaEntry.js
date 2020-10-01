import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

import Container from "react-bootstrap/Container";

import MangaCard from "./MangaCard";
import MangaListItem from "./MangaListItem";

const MangaEntry = () => {
  const [manga, setManga] = useState("");
  const [sort, setSort] = useState(false);
  let width = window.innerWidth;

  const [mangaList, setMangaList] = useState([]);
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const sortBy = sort === true ? "?sortBy=title:asc" : "";

    axios
      .get(`https://eli-manga-api.herokuapp.com/api/manga${sortBy}`)
      .then((res) => {
        console.log(res.data);
        setMangaList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [sort]);

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
          <Form onSubmit={handleSubmit} className="mb-5">
            <Row>
              <img
                src="https://icon-icons.com/icons2/2248/PNG/32/sort_alphabetical_variant_icon_138167.png"
                onClick={() => {
                  setSort(!sort);
                }}
                style={{ cursor: "pointer" }}
                alt="alphabetical sort"
              />
              <Col>
                <Form.Control
                  type="text"
                  value={manga}
                  placeholder="enter manga name"
                  onChange={(e) => setManga(e.target.value)}
                  style={{ border: "solid darkGrey 2px", borderRadius: 50 }}
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
            width > 500 ? (
              mangaList.map((manga) => {
                return <MangaListItem manga={manga} key={manga._id} />;
              })
            ) : (
              mangaList.map((manga) => {
                return <MangaCard manga={manga} key={manga._id} />;
              })
            )
          ) : (
            <div>
              {" "}
              <Row>
                {" "}
                <h3 className="mr-5">Add Manga! </h3>
                <Spinner animation="border" size="lg" />
              </Row>{" "}
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MangaEntry;
