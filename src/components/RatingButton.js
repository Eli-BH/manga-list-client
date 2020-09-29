import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

const RatingButton = () => {
  let userInfo = localStorage.getItem("user");
  const token = JSON.parse(userInfo).token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [rating, setRating] = useState(0);
  const handleRating = (x) => {
    setRating(x);
    axios.patch();
  };
  return (
    <>
      <Dropdown variant="succss" size="sm">
        <Dropdown.Toggle size="sm">
          Rating:
          <Badge variant="light" className="ml-1">{` ${rating}`}</Badge>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleRating(1)}>1</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(2)}>2</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(3)}>3</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(4)}>4</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(6)}>6</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(7)}>7</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(8)}>8</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(9)}>9</Dropdown.Item>
            <Dropdown.Item onClick={() => handleRating(10)}>10</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Toggle>
      </Dropdown>
    </>
  );
};

export default RatingButton;
