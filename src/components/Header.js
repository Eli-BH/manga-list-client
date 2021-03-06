import React, { useState, useEffect } from "react";
import axios from "axios";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";

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
        setMangaList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  for (let i = 0; i < mangaList.length; i++) {
    if (mangaList[i].complete === true) {
      count += 1;
    }
  }

  return (
    <Container fluid>
      <Jumbotron
        className="d-flex justify-content-center align-content-center"
        style={{ backgroundColor: "#50C9CE" }}
      >
        <div style={{ width: "100%" }}>
          <h1>Hello, {userInfo.username}</h1>
          <p>Welcom to your manga list!</p>

          <Row>
            <Col>
              <h4>{` ${mangaList.length}: Manga `}</h4>
            </Col>
            <Col style={{ width: "100%" }}>
              <h4>{`${count}: Completed Manga`}</h4>
            </Col>

            <Col>
              <div className=" d-flex justify-content-center ">
                <LogoutButton setIsLogged={setIsLogged} />
              </div>
            </Col>
          </Row>
        </div>
      </Jumbotron>
    </Container>
  );
};

export default Header;
