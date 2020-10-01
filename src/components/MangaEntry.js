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
            window.location.reload(false);
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ backgroundColor: "#BF1363", height: "100%" }}>
      <div>
        <Container>
          <Form onSubmit={handleSubmit} className="mb-5">
            <Row>
              <img
                src={require("./sort_alphabetical_variant_icon_138167.png")}
                onClick={() => {
                  setSort(!sort);
                }}
                style={{ cursor: "pointer" }}
                alt="alphabetical sort"
                className="pl-2"
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
        <Row className="">
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
            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center"
            >
              {" "}
              <Row>
                {" "}
                <h3 className="mr-5">Waiting for manga! </h3>
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
