import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

import SetStatusButton from "./SetStatusButton";
import DeleteButton from "./DeleteButton";
import RatingButton from "./RatingButton";

const MangaCard = ({ manga }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col className="m-2" md="auto">
        <Card style={{ width: "18rem", border: "black solid 1px" }}>
          <Card.Img
            varient="top"
            src={manga.mangaImage}
            alt={manga.title}
            onClick={handleShow}
          />
          <Card.Body>
            <Card.Title
              className="d-flex justify-content-center"
              style={{ fontSize: 16 }}
            >
              {manga.title}
            </Card.Title>
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-center">
                  {manga.complete ? (
                    <h4>
                      <Badge variant="success">Complete</Badge>
                    </h4>
                  ) : (
                    <h6>
                      <Badge variant="danger">Incomplete</Badge>
                    </h6>
                  )}
                </Col>
                <Col>
                  <h6>
                    <Badge variant="dark">{`${manga.readChapterAmount} / ${
                      manga.chapterAmount === 0 ? "onging" : manga.chapterAmount
                    }`}</Badge>
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col>
                  <SetStatusButton manga={manga} />
                </Col>
                <Col>
                  <DeleteButton />
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{manga.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{manga.synopsis}</Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="d-flex justify-content-center mb-3">
                <Badge variant="info">Reading status</Badge>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <p>Status:{` ${manga.publishing ? "Ongoing" : "Complete"}`}</p>
              </Col>
              <Col>
                <p>MAL rating: {manga.malScore}</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <p>
                  Chapters:{" "}
                  {manga.publishing ? "publishing" : manga.chapterAmount}
                </p>
              </Col>
              <Col>
                <RatingButton />
              </Col>
            </Row>
            <Row>
              <Button variant="dark" className="flex-fill">
                {" "}
                Veiw On MAL
              </Button>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MangaCard;
