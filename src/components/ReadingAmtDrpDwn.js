import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const ReadingAmtDrpDwn = ({ manga }) => {
  const [value, setValue] = useState("");

  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleSubmit = () => {
    axios
      .patch(`https://eli-manga-api.herokuapp.com/api/manga/${manga._id}`, {
        readChapterAmount: value,
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Badge
      variant="dark"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </Badge>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div>
            <Container fluid>
              <Row style={{ width: "40%" }}>
                <Col className="align-self-center">
                  <FormControl
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    size="sm"
                  />
                </Col>
              </Row>
              <Row className="flex-fill">
                <Col className="d-flex justify-content-center">
                  <Button size="sm" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>

          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Dropdown style={{ cursor: "pointer" }}>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {`${manga.readChapterAmount} / ${
          manga.chapterAmount === 0 ? "onging" : manga.chapterAmount
        }`}
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} />
    </Dropdown>
  );
};

export default ReadingAmtDrpDwn;
