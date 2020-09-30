import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

import SetStatusButton from "./SetStatusButton";
import DeleteButton from "./DeleteButton";
import RatingButton from "./RatingButton";
import ReadingStatusBadge from "./ReadingStatusBadge";
import ReadingAmtDrpDwn from "./ReadingAmtDrpDwn";

const MangaListItem = ({ manga }) => {
  return (
    <Container>
      <Accordion style={{ paddingRigh: 5 }}>
        <Card
          style={{
            border: "Solid #50C9CE 2px",
            boxShadow: "5px 5px 6px #888",
          }}
          className="m-2"
        >
          <Accordion.Toggle as={Card} eventKey="0">
            <ListGroup variant="flush" style={{ paddingRight: 5 }}>
              <ListGroup.Item variant="cream">
                <Row className="align-content-center justify-content-between">
                  <Col>
                    <h6>{manga.title}</h6>
                  </Col>
                  <Col>
                    {manga.complete ? (
                      <h5>
                        <Badge variant="success">Complete</Badge>
                      </h5>
                    ) : (
                      <h5>
                        <Badge variant="danger">Incomplete</Badge>
                      </h5>
                    )}
                  </Col>
                  <Col>
                    <SetStatusButton manga={manga} />
                  </Col>
                  <Col style={{ padding: 0 }}>
                    <Container fluid noGutters style={{ padding: 0 }}>
                      <Row>
                        <Col>
                          {" "}
                          <ReadingAmtDrpDwn manga={manga} />
                        </Col>
                        <Col>
                          <DeleteButton manga={manga} />
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body style={{ padding: 10 }}>
              <Container className="d-flex " fluid>
                <Row className="justify-content-between">
                  <Col xs={3}>
                    <img
                      src={manga.mangaImage}
                      alt={manga.title}
                      height="250px"
                    />
                  </Col>

                  <Col xs={3}>{manga.synopsis}</Col>
                  <div className="d-flex align-items-center">
                    <Col xs={1}>
                      <ReadingStatusBadge manga={manga} />
                    </Col>
                  </div>

                  <Col
                    className="d-flex align-items-center flex-fill"
                    style={{ height: "100%", width: "100%", fontSize: 16 }}
                    xs={4}
                  >
                    <div style={{ padding: 1, width: "100%" }}>
                      <Row className="pb-5">
                        <Col>
                          <p>
                            Status:
                            {` ${
                              manga.chapterAmount === 0
                                ? "Ongoing"
                                : " Manga Complete"
                            }`}
                          </p>
                        </Col>
                        <Col>
                          <p>MAL rating: {manga.malScore}</p>
                        </Col>
                      </Row>
                      <Row className="pb-5">
                        <Col>
                          <p>
                            Chapters:{" "}
                            {manga.chapterAmount === 0
                              ? "publishing"
                              : manga.chapterAmount}
                          </p>
                        </Col>
                        <Col>
                          <RatingButton manga={manga} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            variant="dark"
                            style={{ width: "100%" }}
                            href={manga.malURL}
                          >
                            View on MAL
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
};

export default MangaListItem;
